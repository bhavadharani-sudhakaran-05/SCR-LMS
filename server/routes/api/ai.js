const express = require('express');
const router = express.Router();
const {
  generateQuiz,
  summarizeLecture,
  gradeEssay,
  tutorChat,
  generateStudyPlan,
  checkPlagiarism,
  analyzeSentiment,
} = require('../../controllers/aiController');
const { protect } = require('../../middleware/auth');

router.post('/generate-quiz', protect, generateQuiz);
router.post('/summarize-lecture', protect, summarizeLecture);
router.post('/grade-essay', protect, gradeEssay);
router.post('/tutor-chat', protect, tutorChat);
router.post('/study-plan', protect, generateStudyPlan);
router.post('/check-plagiarism', protect, checkPlagiarism);
router.post('/sentiment', protect, analyzeSentiment);

module.exports = router;
