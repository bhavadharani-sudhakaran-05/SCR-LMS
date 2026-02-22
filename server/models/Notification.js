const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        'assignment', 'quiz', 'grade', 'announcement', 'live-class',
        'badge', 'xp', 'chat', 'forum', 'alert', 'system',
        'streak', 'leaderboard', 'course', 'payment',
      ],
      default: 'system',
    },
    link: String,
    isRead: { type: Boolean, default: false },
    icon: String,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    relatedId: mongoose.Schema.Types.ObjectId,
    relatedModel: String,
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
