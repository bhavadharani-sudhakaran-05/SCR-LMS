const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Quiz title is required'],
      trim: true,
    },
    description: String,
    type: {
      type: String,
      enum: ['practice', 'graded', 'boss-challenge', 'daily', 'oral-exam'],
      default: 'graded',
    },
    questions: [
      {
        questionText: { type: String, required: true },
        questionType: {
          type: String,
          enum: ['mcq', 'true-false', 'short-answer', 'fill-blank', 'matching', 'code'],
          required: true,
        },
        options: [
          {
            text: String,
            isCorrect: Boolean,
          },
        ],
        correctAnswer: String,
        explanation: String,
        points: { type: Number, default: 1 },
        difficulty: {
          type: String,
          enum: ['easy', 'medium', 'hard'],
          default: 'medium',
        },
        tags: [String],
        imageFileId: String,
      },
    ],
    duration: { type: Number, required: true }, // minutes
    totalPoints: { type: Number, default: 0 },
    passingScore: { type: Number, default: 60 },

    // Settings
    randomizeOrder: { type: Boolean, default: true },
    showCorrectAnswers: { type: Boolean, default: true },
    maxAttempts: { type: Number, default: 3 },
    isBossChallenge: { type: Boolean, default: false },
    isAIGenerated: { type: Boolean, default: false },

    // Anti-Cheat
    proctoring: {
      enabled: { type: Boolean, default: false },
      eyeTracking: { type: Boolean, default: false },
      tabDetection: { type: Boolean, default: true },
      webcamRequired: { type: Boolean, default: false },
      screenshotInterval: Number,
    },

    // Attempts
    attempts: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        answers: [
          {
            questionIndex: Number,
            selectedOption: Number,
            textAnswer: String,
            isCorrect: Boolean,
            pointsEarned: Number,
          },
        ],
        score: Number,
        percentage: Number,
        startedAt: Date,
        completedAt: Date,
        timeSpent: Number, // seconds
        tabSwitchCount: { type: Number, default: 0 },
        suspiciousActivity: { type: Boolean, default: false },
        passed: Boolean,
      },
    ],

    // Schedule
    startDate: Date,
    endDate: Date,
    isPublished: { type: Boolean, default: false },
    xpReward: { type: Number, default: 100 },
    bossXPReward: { type: Number, default: 500 },
  },
  {
    timestamps: true,
  }
);

quizSchema.pre('save', function (next) {
  this.totalPoints = this.questions.reduce((sum, q) => sum + q.points, 0);
  next();
});

quizSchema.index({ course: 1, type: 1 });

module.exports = mongoose.model('Quiz', quizSchema);
