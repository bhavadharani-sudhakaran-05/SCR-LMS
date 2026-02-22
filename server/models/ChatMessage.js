const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    type: {
      type: String,
      enum: ['text', 'file', 'image', 'system', 'ai-response'],
      default: 'text',
    },
    fileId: String,
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatMessage' },
    isAnonymous: { type: Boolean, default: false },
    sentiment: {
      type: String,
      enum: ['positive', 'neutral', 'negative', 'unknown'],
      default: 'unknown',
    },
    reactions: [
      {
        emoji: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

chatMessageSchema.index({ room: 1, createdAt: -1 });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
