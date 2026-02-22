const Course = require('../models/Course');
const User = require('../models/User');
const slugify = require('slugify');

// @desc    Get all courses
// @route   GET /api/courses
exports.getCourses = async (req, res, next) => {
  try {
    const { category, difficulty, search, page = 1, limit = 12, status } = req.query;

    let query = {};

    if (status) query.status = status;
    else query.status = 'published';

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$text = { $search: search };
    }

    const total = await Course.countDocuments(query);
    const courses = await Course.find(query)
      .populate('teacher', 'name avatar')
      .select('-enrolledStudents -skillTree')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: courses.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      courses,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('teacher', 'name avatar bio')
      .populate('lessons', 'title type duration order xpReward isPublished')
      .populate('assignments', 'title dueDate totalMarks type')
      .populate('quizzes', 'title type duration totalPoints isBossChallenge');

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({ success: true, course });
  } catch (error) {
    next(error);
  }
};

// @desc    Create course
// @route   POST /api/courses
exports.createCourse = async (req, res, next) => {
  try {
    req.body.teacher = req.user._id;
    req.body.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now();

    const course = await Course.create(req.body);

    res.status(201).json({ success: true, course });
  } catch (error) {
    next(error);
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
exports.updateCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Check ownership
    if (course.teacher.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now();
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, course });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.teacher.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await course.deleteOne();

    res.status(200).json({ success: true, message: 'Course deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
exports.enrollCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({ success: false, message: 'Already enrolled' });
    }

    if (course.enrolledStudents.length >= course.maxStudents) {
      return res.status(400).json({ success: false, message: 'Course is full' });
    }

    course.enrolledStudents.push(req.user._id);
    await course.save();

    // Add to user's enrolledCourses
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { enrolledCourses: course._id },
    });

    res.status(200).json({ success: true, message: 'Enrolled successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my courses (teacher)
// @route   GET /api/courses/my-courses
exports.getMyCourses = async (req, res, next) => {
  try {
    let courses;
    if (req.user.role === 'teacher') {
      courses = await Course.find({ teacher: req.user._id }).sort('-createdAt');
    } else {
      courses = await Course.find({ enrolledStudents: req.user._id })
        .populate('teacher', 'name avatar')
        .sort('-createdAt');
    }

    res.status(200).json({ success: true, count: courses.length, courses });
  } catch (error) {
    next(error);
  }
};
