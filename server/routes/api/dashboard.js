const express = require('express');
const router = express.Router();
const {
  getStudentDashboard,
  getTeacherDashboard,
  getAdminDashboard,
  getParentDashboard,
} = require('../../controllers/dashboardController');
const { protect, authorize } = require('../../middleware/auth');

router.get('/student', protect, authorize('student'), getStudentDashboard);
router.get('/teacher', protect, authorize('teacher'), getTeacherDashboard);
router.get('/admin', protect, authorize('admin'), getAdminDashboard);
router.get('/parent', protect, authorize('parent'), getParentDashboard);

module.exports = router;
