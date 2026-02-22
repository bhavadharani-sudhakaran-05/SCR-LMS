const User = require('../models/User');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const { sendTokenResponse } = require('../utils/tokenUtils');
const { updateStreak, awardXP } = require('../services/gamificationService');

// @desc    Register user
// @route   POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    // Only admin can create other admins
    const userRole = role === 'admin' ? 'student' : role || 'student';

    const user = await User.create({
      name,
      email,
      password,
      role: userRole,
    });

    // Award first login XP
    await awardXP(user._id, 'daily-login', { description: 'Welcome to Acadrix!' });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check 2FA
    if (user.twoFactorEnabled) {
      const tempToken = jwt.sign(
        { id: user._id, requires2FA: true },
        process.env.JWT_SECRET,
        { expiresIn: '5m' }
      );
      return res.status(200).json({
        success: true,
        requires2FA: true,
        tempToken,
      });
    }

    // Update streak
    await updateStreak(user._id);
    await awardXP(user._id, 'daily-login');

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Verify 2FA
// @route   POST /api/auth/verify-2fa
exports.verify2FA = async (req, res, next) => {
  try {
    const { tempToken, code } = req.body;

    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
    if (!decoded.requires2FA) {
      return res.status(400).json({ success: false, message: 'Invalid token' });
    }

    const user = await User.findById(decoded.id);
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: code,
    });

    if (!verified) {
      return res.status(401).json({ success: false, message: 'Invalid 2FA code' });
    }

    await updateStreak(user._id);
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Setup 2FA
// @route   POST /api/auth/setup-2fa
exports.setup2FA = async (req, res, next) => {
  try {
    const secret = speakeasy.generateSecret({
      name: `${process.env.TWO_FA_APP_NAME} (${req.user.email})`,
    });

    req.user.twoFactorSecret = secret.base32;
    await req.user.save();

    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

    res.status(200).json({
      success: true,
      secret: secret.base32,
      qrCode: qrCodeUrl,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Enable 2FA
// @route   POST /api/auth/enable-2fa
exports.enable2FA = async (req, res, next) => {
  try {
    const { code } = req.body;

    const verified = speakeasy.totp.verify({
      secret: req.user.twoFactorSecret,
      encoding: 'base32',
      token: code,
    });

    if (!verified) {
      return res.status(400).json({ success: false, message: 'Invalid code' });
    }

    req.user.twoFactorEnabled = true;
    await req.user.save();

    res.status(200).json({ success: true, message: '2FA enabled successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('enrolledCourses', 'title slug thumbnail category')
      .populate('children', 'name email avatar xpPoints level');

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update profile
// @route   PUT /api/auth/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const allowedFields = ['name', 'bio', 'phone', 'dateOfBirth', 'address', 'preferences', 'avatar'];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh token
// @route   POST /api/auth/refresh-token
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ success: false, message: 'No refresh token' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
exports.logout = async (req, res, next) => {
  try {
    if (req.user) {
      req.user.refreshToken = undefined;
      await req.user.save({ validateBeforeSave: false });
    }

    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
exports.googleCallback = async (req, res, next) => {
  try {
    await updateStreak(req.user._id);
    sendTokenResponse(req.user, 200, res);
  } catch (error) {
    next(error);
  }
};
