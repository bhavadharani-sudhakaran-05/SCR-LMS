const User = require('../models/User');
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');
const Quiz = require('../models/Quiz');
const LiveClass = require('../models/LiveClass');
const XPRecord = require('../models/XPRecord');
const Notification = require('../models/Notification');
const { getLeaderboard } = require('../services/gamificationService');

// @desc    Get student dashboard data
// @route   GET /api/student/dashboard
exports.getStudentDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [
      enrolledCourses,
      upcomingAssignments,
      upcomingClasses,
      recentXP,
      unreadNotifications,
      leaderboard,
    ] = await Promise.all([
      Course.find({ enrolledStudents: userId })
        .populate('teacher', 'name avatar')
        .select('title thumbnail category completionRate')
        .limit(6),
      Assignment.find({
        'submissions.student': { $ne: userId },
        dueDate: { $gte: new Date() },
        isPublished: true,
      })
        .populate('course', 'title')
        .select('title dueDate course totalMarks type')
        .sort('dueDate')
        .limit(5),
      LiveClass.find({
        status: 'scheduled',
        scheduledAt: { $gte: new Date() },
      })
        .populate('course', 'title')
        .populate('teacher', 'name')
        .select('title scheduledAt duration course teacher')
        .sort('scheduledAt')
        .limit(5),
      XPRecord.find({ student: userId })
        .sort('-createdAt')
        .limit(10),
      Notification.countDocuments({ user: userId, isRead: false }),
      getLeaderboard({ limit: 5 }),
    ]);

    const user = await User.findById(userId).select(
      'name avatar xpPoints level streakCount badges learningStyle'
    );

    res.status(200).json({
      success: true,
      dashboard: {
        user: {
          ...user.toObject(),
          avatarUrl: user.avatarUrl,
        },
        stats: {
          enrolledCourses: enrolledCourses.length,
          xpPoints: user.xpPoints,
          level: user.level,
          streak: user.streakCount,
          badges: user.badges.length,
          unreadNotifications,
        },
        enrolledCourses,
        upcomingAssignments,
        upcomingClasses,
        recentXP,
        leaderboard,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get teacher dashboard data
// @route   GET /api/teacher/dashboard
exports.getTeacherDashboard = async (req, res, next) => {
  try {
    const teacherId = req.user._id;

    const [courses, upcomingClasses, pendingSubmissions, totalStudents] =
      await Promise.all([
        Course.find({ teacher: teacherId }).select(
          'title enrolledStudents status category rating'
        ),
        LiveClass.find({
          teacher: teacherId,
          status: 'scheduled',
          scheduledAt: { $gte: new Date() },
        })
          .select('title scheduledAt duration course')
          .sort('scheduledAt')
          .limit(5),
        Assignment.find({ teacher: teacherId })
          .select('title submissions course dueDate')
          .sort('-createdAt')
          .limit(5),
        Course.aggregate([
          { $match: { teacher: teacherId } },
          { $project: { studentCount: { $size: '$enrolledStudents' } } },
          { $group: { _id: null, total: { $sum: '$studentCount' } } },
        ]),
      ]);

    const atRiskStudents = await getAtRiskStudents(teacherId);

    res.status(200).json({
      success: true,
      dashboard: {
        stats: {
          totalCourses: courses.length,
          totalStudents: totalStudents[0]?.total || 0,
          activeCourses: courses.filter((c) => c.status === 'published').length,
          pendingGrading: pendingSubmissions.reduce(
            (sum, a) => sum + a.submissions.filter((s) => s.status === 'submitted').length,
            0
          ),
        },
        courses,
        upcomingClasses,
        pendingSubmissions,
        atRiskStudents,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin dashboard
// @route   GET /api/admin/dashboard
exports.getAdminDashboard = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalCourses,
      totalStudents,
      totalTeachers,
      recentUsers,
      coursesByCategory,
    ] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'teacher' }),
      User.find().select('name email role createdAt avatar').sort('-createdAt').limit(10),
      Course.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);

    res.status(200).json({
      success: true,
      dashboard: {
        stats: {
          totalUsers,
          totalCourses,
          totalStudents,
          totalTeachers,
          totalParents: await User.countDocuments({ role: 'parent' }),
        },
        recentUsers,
        coursesByCategory,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get parent dashboard
// @route   GET /api/parent/dashboard
exports.getParentDashboard = async (req, res, next) => {
  try {
    const parent = await User.findById(req.user._id).populate({
      path: 'children',
      select: 'name avatar xpPoints level streakCount enrolledCourses badges',
      populate: {
        path: 'enrolledCourses',
        select: 'title category completionRate',
      },
    });

    const childrenData = [];

    for (const child of parent.children || []) {
      const recentActivity = await XPRecord.find({ student: child._id })
        .sort('-createdAt')
        .limit(10);

      const upcomingAssignments = await Assignment.find({
        'submissions.student': { $ne: child._id },
        dueDate: { $gte: new Date() },
      })
        .populate('course', 'title')
        .select('title dueDate course')
        .limit(5);

      childrenData.push({
        child: {
          ...child.toObject(),
          avatarUrl: child.avatarUrl,
        },
        recentActivity,
        upcomingAssignments,
      });
    }

    res.status(200).json({
      success: true,
      dashboard: {
        children: childrenData,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Helper: Get at-risk students
const getAtRiskStudents = async (teacherId) => {
  try {
    const courses = await Course.find({ teacher: teacherId }).select('enrolledStudents');
    const studentIds = courses.flatMap((c) => c.enrolledStudents);
    const uniqueIds = [...new Set(studentIds.map((id) => id.toString()))];

    const students = await User.find({
      _id: { $in: uniqueIds },
      $or: [
        { streakCount: { $lt: 2 } },
        { xpPoints: { $lt: 100 } },
      ],
    })
      .select('name avatar xpPoints level streakCount lastActiveDate')
      .limit(10);

    return students;
  } catch (error) {
    return [];
  }
};
