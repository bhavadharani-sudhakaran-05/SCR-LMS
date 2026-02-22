const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
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
      required: [true, 'Assignment title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructions: String,
    type: {
      type: String,
      enum: ['essay', 'code', 'file-upload', 'project', 'report'],
      default: 'essay',
    },
    dueDate: {
      type: Date,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
      default: 100,
    },
    rubric: [
      {
        criterion: String,
        maxScore: Number,
        description: String,
        weight: Number,
      },
    ],
    attachments: [
      {
        name: String,
        fileId: String,
        type: String,
      },
    ],

    // Submissions
    submissions: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        submittedAt: { type: Date, default: Date.now },
        content: String,
        fileId: String,
        fileName: String,

        // Grading
        aiGrade: {
          score: Number,
          feedback: String,
          rubricScores: [
            {
              criterion: String,
              score: Number,
              comment: String,
            },
          ],
          gradedAt: Date,
        },
        teacherGrade: {
          score: Number,
          feedback: String,
          gradedAt: Date,
        },
        finalGrade: Number,

        // Plagiarism
        plagiarismScore: { type: Number, default: 0 },
        plagiarismReport: {
          sources: [String],
          matchedText: [String],
          checkedAt: Date,
        },

        // Status
        status: {
          type: String,
          enum: ['submitted', 'graded', 'returned', 'late', 'missing'],
          default: 'submitted',
        },

        // Peer Review
        peerReviews: [
          {
            reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            feedback: String,
            rating: Number,
            reviewedAt: { type: Date, default: Date.now },
          },
        ],
      },
    ],

    // Settings
    allowLateSubmission: { type: Boolean, default: false },
    latePenalty: { type: Number, default: 10 }, // percentage
    maxAttempts: { type: Number, default: 1 },
    isPublished: { type: Boolean, default: false },
    xpReward: { type: Number, default: 50 },
  },
  {
    timestamps: true,
  }
);

assignmentSchema.index({ course: 1, dueDate: 1 });
assignmentSchema.index({ teacher: 1 });

module.exports = mongoose.model('Assignment', assignmentSchema);
