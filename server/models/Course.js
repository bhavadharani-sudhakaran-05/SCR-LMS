const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: 2000,
    },
    shortDescription: {
      type: String,
      maxlength: 300,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'mathematics', 'science', 'english', 'history', 'computer-science',
        'physics', 'chemistry', 'biology', 'geography', 'economics',
        'art', 'music', 'physical-education', 'languages', 'other',
      ],
    },
    tags: [String],
    thumbnail: String,
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    price: { type: Number, default: 0 },
    isFree: { type: Boolean, default: true },

    // Structure
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],

    // Enrollment
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    maxStudents: { type: Number, default: 100 },

    // Gamification
    skillTree: [
      {
        nodeId: String,
        title: String,
        description: String,
        xpReward: { type: Number, default: 50 },
        parentNode: String,
        lessonRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
        isUnlocked: { type: Boolean, default: false },
        completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        position: { x: Number, y: Number },
        icon: String,
      },
    ],
    totalXP: { type: Number, default: 0 },

    // Analytics
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalRatings: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 },
    totalWatchTime: { type: Number, default: 0 },

    // Schedule
    startDate: Date,
    endDate: Date,
    schedule: [
      {
        day: { type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
        startTime: String,
        endTime: String,
      },
    ],

    // Prerequisites
    prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

courseSchema.virtual('enrollmentCount').get(function () {
  return this.enrolledStudents ? this.enrolledStudents.length : 0;
});

courseSchema.virtual('lessonCount').get(function () {
  return this.lessons ? this.lessons.length : 0;
});

courseSchema.index({ title: 'text', description: 'text', tags: 'text' });
courseSchema.index({ teacher: 1, status: 1 });
courseSchema.index({ category: 1, difficulty: 1 });

module.exports = mongoose.model('Course', courseSchema);
