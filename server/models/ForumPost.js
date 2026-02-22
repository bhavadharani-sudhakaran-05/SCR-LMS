const mongoose = require('mongoose');

const forumPostSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [String],
    isAnonymous: { type: Boolean, default: false },
    isPinned: { type: Boolean, default: false },
    isResolved: { type: Boolean, default: false },

    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    views: { type: Number, default: 0 },

    replies: [
      {
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: String,
        isAnonymous: { type: Boolean, default: false },
        isAcceptedAnswer: { type: Boolean, default: false },
        upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        createdAt: { type: Date, default: Date.now },
        sentiment: String,
      },
    ],

    sentiment: String,
  },
  {
    timestamps: true,
  }
);

forumPostSchema.index({ course: 1, createdAt: -1 });
forumPostSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('ForumPost', forumPostSchema);
