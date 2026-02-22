const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  register,
  login,
  verify2FA,
  setup2FA,
  enable2FA,
  getMe,
  updateProfile,
  refreshToken,
  logout,
  googleCallback,
} = require('../../controllers/authController');
const { protect } = require('../../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/verify-2fa', verify2FA);
router.post('/refresh-token', refreshToken);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/setup-2fa', protect, setup2FA);
router.post('/enable-2fa', protect, enable2FA);

// Google OAuth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  googleCallback
);

module.exports = router;
