const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getMyCourses,
} = require('../../controllers/courseController');
const { protect, authorize } = require('../../middleware/auth');

router.get('/', getCourses);
router.get('/my-courses', protect, getMyCourses);
router.get('/:id', getCourse);
router.post('/', protect, authorize('teacher', 'admin'), createCourse);
router.put('/:id', protect, authorize('teacher', 'admin'), updateCourse);
router.delete('/:id', protect, authorize('teacher', 'admin'), deleteCourse);
router.post('/:id/enroll', protect, authorize('student'), enrollCourse);

module.exports = router;
