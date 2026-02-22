const mongoose = require('mongoose');

const xpRecordSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        'lesson-complete', 'assignment-submit', 'quiz-pass', 'quiz-perfect',
        'daily-login', 'streak-bonus', 'boss-challenge', 'peer-review',
        'forum-post', 'forum-answer', 'live-class-attend', 'course-complete',
        'badge-earned', 'mission-complete', 'marketplace-upload',
        'helpful-answer', 'leaderboard-top', 'classroom-war-win',
      ],
    },
    xpEarned: {
      type: Number,
      required: true,
    },
    description: String,
    badge: {
      name: String,
      icon: String,
      description: String,
    },
    mission: {
      missionId: String,
      title: String,
    },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    relatedId: mongoose.Schema.Types.ObjectId,
    relatedModel: String,
  },
  {
    timestamps: true,
  }
);

xpRecordSchema.index({ student: 1, createdAt: -1 });
xpRecordSchema.index({ action: 1 });

module.exports = mongoose.model('XPRecord', xpRecordSchema);
