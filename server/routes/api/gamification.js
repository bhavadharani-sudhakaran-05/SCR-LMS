const express = require('express');
const router = express.Router();
const {
  awardXPToStudent,
  getGlobalLeaderboard,
  getXPHistory,
  getAllBadges,
  getXPValues,
} = require('../../controllers/gamificationController');
const { protect, authorize } = require('../../middleware/auth');

router.post('/award-xp', protect, authorize('teacher', 'admin'), awardXPToStudent);
router.get('/leaderboard', protect, getGlobalLeaderboard);
router.get('/xp-history', protect, getXPHistory);
router.get('/badges', protect, getAllBadges);
router.get('/xp-values', protect, getXPValues);

module.exports = router;
