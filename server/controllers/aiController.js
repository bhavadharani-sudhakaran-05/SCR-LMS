const aiService = require('../services/aiService');
const Quiz = require('../models/Quiz');
const Lesson = require('../models/Lesson');

// @desc    Generate quiz from content
// @route   POST /api/ai/generate-quiz
exports.generateQuiz = async (req, res, next) => {
  try {
    const { content, numQuestions, difficulty, type, courseId } = req.body;

    if (!content) {
      return res.status(400).json({ success: false, message: 'Content is required' });
    }

    const result = await aiService.generateQuiz(content, {
      numQuestions,
      difficulty,
      type,
    });

    if (!result.success) {
      return res.status(500).json({ success: false, message: 'Failed to generate quiz' });
    }

    res.status(200).json({ success: true, questions: result.questions });
  } catch (error) {
    next(error);
  }
};

// @desc    Summarize lecture
// @route   POST /api/ai/summarize-lecture
exports.summarizeLecture = async (req, res, next) => {
  try {
    const { content, lessonId } = req.body;

    if (!content && !lessonId) {
      return res.status(400).json({ success: false, message: 'Content or lesson ID required' });
    }

    let textContent = content;
    if (lessonId) {
      const lesson = await Lesson.findById(lessonId);
      if (lesson) {
        textContent = lesson.content?.text || lesson.transcript || content;
      }
    }

    const result = await aiService.summarizeLecture(textContent);

    if (lessonId && result.success) {
      await Lesson.findByIdAndUpdate(lessonId, {
        aiNotes: result.summary,
        keyPoints: result.keyPoints,
      });
    }

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// @desc    Grade essay
// @route   POST /api/ai/grade-essay
exports.gradeEssay = async (req, res, next) => {
  try {
    const { essay, rubric } = req.body;

    if (!essay) {
      return res.status(400).json({ success: false, message: 'Essay content required' });
    }

    const result = await aiService.gradeEssay(essay, rubric);

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// @desc    AI Tutor chat
// @route   POST /api/ai/tutor-chat
exports.tutorChat = async (req, res, next) => {
  try {
    const { message, courseId, context } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const result = await aiService.tutorChat(message, { courseId, ...context });

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate study plan
// @route   POST /api/ai/study-plan
exports.generateStudyPlan = async (req, res, next) => {
  try {
    const studentData = {
      userId: req.user._id,
      enrolledCourses: req.user.enrolledCourses,
      learningStyle: req.user.learningStyle,
      ...req.body,
    };

    const result = await aiService.generateStudyPlan(studentData);

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// @desc    Check plagiarism
// @route   POST /api/ai/check-plagiarism
exports.checkPlagiarism = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ success: false, message: 'Content required' });
    }

    const result = await aiService.checkPlagiarism(content);

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// @desc    Analyze sentiment
// @route   POST /api/ai/sentiment
exports.analyzeSentiment = async (req, res, next) => {
  try {
    const { text } = req.body;
    const result = await aiService.analyzeSentiment(text);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};
