const mongoose = require('mongoose');

const liveClassSchema = new mongoose.Schema(
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
      required: true,
      trim: true,
    },
    description: String,
    scheduledAt: {
      type: Date,
      required: true,
    },
    duration: { type: Number, default: 60 }, // minutes
    status: {
      type: String,
      enum: ['scheduled', 'live', 'ended', 'cancelled'],
      default: 'scheduled',
    },

    // Recording
    recordingFileId: String,
    recordingDuration: Number,

    // Attendance
    attendees: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        joinedAt: Date,
        leftAt: Date,
        duration: Number,
        faceVerified: { type: Boolean, default: false },
      },
    ],

    // Interactive
    polls: [
      {
        question: String,
        options: [
          {
            text: String,
            votes: { type: Number, default: 0 },
            voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
          },
        ],
        createdAt: { type: Date, default: Date.now },
        isActive: { type: Boolean, default: true },
      },
    ],
    qnaQuestions: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        question: String,
        answer: String,
        answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        isAnonymous: { type: Boolean, default: false },
        upvotes: { type: Number, default: 0 },
        askedAt: { type: Date, default: Date.now },
      },
    ],
    handRaises: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        raisedAt: Date,
        resolved: { type: Boolean, default: false },
      },
    ],

    // Analytics
    engagementScore: { type: Number, default: 0, min: 0, max: 100 },
    peakAttendance: { type: Number, default: 0 },
    chatMessages: { type: Number, default: 0 },

    // Room
    roomId: String,
    maxParticipants: { type: Number, default: 100 },
    isRecordingEnabled: { type: Boolean, default: true },
    isWhiteboardEnabled: { type: Boolean, default: true },
    breakoutRooms: [
      {
        name: String,
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      },
    ],

    xpReward: { type: Number, default: 30 },
  },
  {
    timestamps: true,
  }
);

liveClassSchema.index({ course: 1, scheduledAt: 1 });
liveClassSchema.index({ teacher: 1, status: 1 });

module.exports = mongoose.model('LiveClass', liveClassSchema);
