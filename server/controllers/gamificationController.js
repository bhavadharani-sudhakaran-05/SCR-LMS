const { awardXP, getLeaderboard, BADGES, XP_VALUES } = require('../services/gamificationService');
const User = require('../models/User');
const XPRecord = require('../models/XPRecord');

// @desc    Award XP to student
// @route   POST /api/gamification/award-xp
exports.awardXPToStudent = async (req, res, next) => {
  try {
    const { studentId, action, customXP, description, courseId } = req.body;
    const result = await awardXP(studentId, action, { customXP, description, courseId });

    if (!result) {
      return res.status(400).json({ success: false, message: 'Failed to award XP' });
    }

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// @desc    Get global leaderboard
// @route   GET /api/leaderboard/global
exports.getGlobalLeaderboard = async (req, res, next) => {
  try {
    const { limit = 20 } = req.query;
    const leaderboard = await getLeaderboard({ limit: parseInt(limit) });

    // Find current user's rank
    let myRank = null;
    if (req.user && req.user.role === 'student') {
      const higherRanked = await User.countDocuments({
        role: 'student',
        xpPoints: { $gt: req.user.xpPoints },
      });
      myRank = higherRanked + 1;
    }

    res.status(200).json({ success: true, leaderboard, myRank });
  } catch (error) {
    next(error);
  }
};

// @desc    Get XP history
// @route   GET /api/gamification/xp-history
exports.getXPHistory = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const records = await XPRecord.find({ student: req.user._id })
      .populate('course', 'title')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await XPRecord.countDocuments({ student: req.user._id });

    res.status(200).json({
      success: true,
      records,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all badges
// @route   GET /api/gamification/badges
exports.getAllBadges = async (req, res, next) => {
  try {
    const userBadges = req.user.badges.map((b) => b.name);
    const allBadges = Object.entries(BADGES).map(([key, badge]) => ({
      id: key,
      ...badge,
      earned: userBadges.includes(badge.name),
    }));

    res.status(200).json({ success: true, badges: allBadges });
  } catch (error) {
    next(error);
  }
};

// @desc    Get XP values reference
// @route   GET /api/gamification/xp-values
exports.getXPValues = async (req, res, next) => {
  res.status(200).json({ success: true, xpValues: XP_VALUES });
};
