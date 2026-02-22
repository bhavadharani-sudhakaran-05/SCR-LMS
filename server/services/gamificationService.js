const User = require('../models/User');
const XPRecord = require('../models/XPRecord');
const Notification = require('../models/Notification');

// Badge definitions
const BADGES = {
  'first-login': { name: 'Welcome!', icon: '🎉', description: 'Logged in for the first time' },
  'first-lesson': { name: 'Eager Learner', icon: '📚', description: 'Completed your first lesson' },
  'first-assignment': { name: 'Achiever', icon: '📝', description: 'Submitted your first assignment' },
  'first-quiz': { name: 'Quiz Starter', icon: '🎯', description: 'Completed your first quiz' },
  'perfect-quiz': { name: 'Perfectionist', icon: '💯', description: 'Got 100% on a quiz' },
  'streak-7': { name: 'Week Warrior', icon: '🔥', description: '7-day streak' },
  'streak-30': { name: 'Monthly Master', icon: '🌟', description: '30-day streak' },
  'streak-100': { name: 'Century Streak', icon: '💎', description: '100-day streak' },
  'xp-1000': { name: 'XP Hunter', icon: '⚡', description: 'Earned 1000 XP' },
  'xp-5000': { name: 'XP Master', icon: '🏆', description: 'Earned 5000 XP' },
  'xp-10000': { name: 'XP Legend', icon: '👑', description: 'Earned 10000 XP' },
  'level-5': { name: 'Rising Star', icon: '⭐', description: 'Reached Level 5' },
  'level-10': { name: 'Expert', icon: '🌠', description: 'Reached Level 10' },
  'level-25': { name: 'Grandmaster', icon: '🎖️', description: 'Reached Level 25' },
  'course-complete': { name: 'Graduate', icon: '🎓', description: 'Completed a course' },
  'courses-5': { name: 'Scholar', icon: '📖', description: 'Completed 5 courses' },
  'boss-slayer': { name: 'Boss Slayer', icon: '🐉', description: 'Defeated a Boss Challenge' },
  'helper': { name: 'Helpful Hand', icon: '🤝', description: 'Answered 10 forum questions' },
  'social-butterfly': { name: 'Social Butterfly', icon: '🦋', description: 'Made 50 forum posts' },
  'early-bird': { name: 'Early Bird', icon: '🐦', description: 'Submitted before deadline 10 times' },
  'night-owl': { name: 'Night Owl', icon: '🦉', description: 'Studied past midnight' },
  'speed-demon': { name: 'Speed Demon', icon: '⚡', description: 'Completed a quiz in under 2 minutes' },
  'consistent': { name: 'Mr. Consistent', icon: '📊', description: 'Maintained grade above 90% for a month' },
  'peer-reviewer': { name: 'Peer Reviewer', icon: '👀', description: 'Reviewed 10 peer assignments' },
  'marketplace-seller': { name: 'Entrepreneur', icon: '💼', description: 'Sold study materials' },
};

// XP Values for actions
const XP_VALUES = {
  'lesson-complete': 25,
  'assignment-submit': 50,
  'quiz-pass': 75,
  'quiz-perfect': 150,
  'daily-login': 10,
  'streak-bonus': 5, // per streak day
  'boss-challenge': 500,
  'peer-review': 20,
  'forum-post': 10,
  'forum-answer': 15,
  'live-class-attend': 30,
  'course-complete': 300,
  'mission-complete': 100,
  'marketplace-upload': 25,
  'helpful-answer': 25,
  'leaderboard-top': 200,
  'classroom-war-win': 250,
};

// Award XP to a student
const awardXP = async (studentId, action, options = {}) => {
  try {
    const xpAmount = options.customXP || XP_VALUES[action] || 0;
    if (xpAmount === 0) return null;

    const user = await User.findById(studentId);
    if (!user || user.role !== 'student') return null;

    // Create XP record
    const record = await XPRecord.create({
      student: studentId,
      action,
      xpEarned: xpAmount,
      description: options.description || `Earned ${xpAmount} XP for ${action}`,
      course: options.courseId,
      relatedId: options.relatedId,
      relatedModel: options.relatedModel,
    });

    // Update user XP
    user.xpPoints += xpAmount;
    const newLevel = user.calculateLevel();
    await user.save();

    // Check for XP-based badges
    await checkAndAwardBadges(user, action);

    // Create notification
    await Notification.create({
      user: studentId,
      title: '⚡ XP Earned!',
      message: `You earned ${xpAmount} XP for ${action.replace(/-/g, ' ')}!`,
      type: 'xp',
      icon: '⚡',
      priority: 'low',
    });

    return { xpEarned: xpAmount, totalXP: user.xpPoints, level: newLevel, record };
  } catch (error) {
    console.error('Error awarding XP:', error);
    return null;
  }
};

// Check and award badges
const checkAndAwardBadges = async (user, action) => {
  const badgesToAward = [];

  // XP-based badges
  if (user.xpPoints >= 1000 && !hasBadge(user, 'XP Hunter')) {
    badgesToAward.push(BADGES['xp-1000']);
  }
  if (user.xpPoints >= 5000 && !hasBadge(user, 'XP Master')) {
    badgesToAward.push(BADGES['xp-5000']);
  }
  if (user.xpPoints >= 10000 && !hasBadge(user, 'XP Legend')) {
    badgesToAward.push(BADGES['xp-10000']);
  }

  // Level-based badges
  if (user.level >= 5 && !hasBadge(user, 'Rising Star')) {
    badgesToAward.push(BADGES['level-5']);
  }
  if (user.level >= 10 && !hasBadge(user, 'Expert')) {
    badgesToAward.push(BADGES['level-10']);
  }
  if (user.level >= 25 && !hasBadge(user, 'Grandmaster')) {
    badgesToAward.push(BADGES['level-25']);
  }

  // Streak-based badges
  if (user.streakCount >= 7 && !hasBadge(user, 'Week Warrior')) {
    badgesToAward.push(BADGES['streak-7']);
  }
  if (user.streakCount >= 30 && !hasBadge(user, 'Monthly Master')) {
    badgesToAward.push(BADGES['streak-30']);
  }
  if (user.streakCount >= 100 && !hasBadge(user, 'Century Streak')) {
    badgesToAward.push(BADGES['streak-100']);
  }

  // Action-based badges
  if (action === 'quiz-perfect' && !hasBadge(user, 'Perfectionist')) {
    badgesToAward.push(BADGES['perfect-quiz']);
  }
  if (action === 'boss-challenge' && !hasBadge(user, 'Boss Slayer')) {
    badgesToAward.push(BADGES['boss-slayer']);
  }
  if (action === 'course-complete' && !hasBadge(user, 'Graduate')) {
    badgesToAward.push(BADGES['course-complete']);
  }

  // Award badges
  for (const badge of badgesToAward) {
    user.badges.push({
      name: badge.name,
      icon: badge.icon,
      description: badge.description,
      earnedAt: new Date(),
    });

    await Notification.create({
      user: user._id,
      title: '🏅 New Badge Earned!',
      message: `${badge.icon} You earned the "${badge.name}" badge! ${badge.description}`,
      type: 'badge',
      icon: badge.icon,
      priority: 'medium',
    });
  }

  if (badgesToAward.length > 0) {
    await user.save();
  }

  return badgesToAward;
};

// Helper: check if user has a badge
const hasBadge = (user, badgeName) => {
  return user.badges.some((b) => b.name === badgeName);
};

// Update streak
const updateStreak = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;

  if (lastActive) {
    lastActive.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      user.streakCount += 1;
      // Streak bonus XP
      await awardXP(userId, 'streak-bonus', {
        customXP: user.streakCount * 5,
        description: `${user.streakCount}-day streak bonus!`,
      });
    } else if (diffDays > 1) {
      user.streakCount = 1;
    }
  } else {
    user.streakCount = 1;
  }

  user.lastActiveDate = today;
  await user.save();
};

// Get leaderboard
const getLeaderboard = async (options = {}) => {
  const { limit = 20, courseId, timeframe } = options;

  let query = { role: 'student' };
  let sortField = '-xpPoints';

  const leaderboard = await User.find(query)
    .select('name avatar xpPoints level streakCount badges')
    .sort(sortField)
    .limit(limit);

  return leaderboard.map((user, index) => ({
    rank: index + 1,
    _id: user._id,
    name: user.name,
    avatar: user.avatarUrl,
    xpPoints: user.xpPoints,
    level: user.level,
    streakCount: user.streakCount,
    badgeCount: user.badges.length,
  }));
};

module.exports = {
  BADGES,
  XP_VALUES,
  awardXP,
  checkAndAwardBadges,
  updateStreak,
  getLeaderboard,
};
