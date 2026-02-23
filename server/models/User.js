const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'teacher', 'student', 'parent'],
      default: 'student',
    },
    avatar: {
      type: String,
      default: '',
    },
    googleId: String,
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    // 2FA
    twoFactorSecret: String,
    twoFactorEnabled: { type: Boolean, default: false },

    // Profile
    phone: String,
    bio: { type: String, maxlength: 500 },
    dateOfBirth: Date,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
    },

    // Gamification
    xpPoints: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streakCount: { type: Number, default: 0 },
    lastActiveDate: Date,
    badges: [
      {
        name: String,
        icon: String,
        earnedAt: { type: Date, default: Date.now },
        description: String,
      },
    ],

    // Learning
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    completedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    learningStyle: {
      type: String,
      enum: ['visual', 'auditory', 'reading', 'kinesthetic', 'unknown'],
      default: 'unknown',
    },
    skills: [
      {
        name: String,
        level: { type: Number, default: 0 },
        maxLevel: { type: Number, default: 100 },
      },
    ],

    // Parent link
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // Preferences
    preferences: {
      darkMode: { type: Boolean, default: false },
      focusMode: { type: Boolean, default: false },
      language: { type: String, default: 'en' },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
      },
    },

    // Tokens
    refreshToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verifyToken: String,
    verifyTokenExpire: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Encrypt password before save
userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

// Calculate level from XP
userSchema.methods.calculateLevel = function () {
  this.level = Math.floor(this.xpPoints / 500) + 1;
  return this.level;
};

// Virtual: full avatar URL
userSchema.virtual('avatarUrl').get(function () {
  if (this.avatar && this.avatar.startsWith('http')) return this.avatar;
  return this.avatar
    ? `/api/files/${this.avatar}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(this.name)}&background=6366f1&color=fff&bold=true`;
});

module.exports = mongoose.model('User', userSchema);
