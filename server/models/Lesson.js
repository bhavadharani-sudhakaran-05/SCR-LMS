const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Lesson title is required'],
      trim: true,
    },
    description: String,
    type: {
      type: String,
      enum: ['video', 'pdf', 'article', 'interactive', 'quiz'],
      required: true,
    },
    content: {
      // For article type
      text: String,
      // For video type
      videoFileId: String,
      videoDuration: Number,
      // For PDF type
      pdfFileId: String,
      // External link
      externalUrl: String,
    },
    order: { type: Number, default: 0 },
    duration: { type: Number, default: 0 }, // minutes

    // AI-generated
    aiNotes: String,
    transcript: String,
    summary: String,
    keyPoints: [String],

    // Engagement
    watchAnalytics: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        watchTime: Number,
        completed: Boolean,
        lastWatchedAt: Date,
        progress: { type: Number, default: 0, min: 0, max: 100 },
      },
    ],

    // Gamification
    xpReward: { type: Number, default: 25 },
    isMission: { type: Boolean, default: false },
    missionTitle: String,

    // Access
    isPreview: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },

    // Resources
    attachments: [
      {
        name: String,
        fileId: String,
        type: String,
        size: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

lessonSchema.index({ course: 1, order: 1 });

module.exports = mongoose.model('Lesson', lessonSchema);
