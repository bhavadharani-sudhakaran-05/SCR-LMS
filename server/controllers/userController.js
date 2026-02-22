const User = require('../models/User');

// @desc    Get all users (admin)
// @route   GET /api/users
exports.getUsers = async (req, res, next) => {
  try {
    const { role, search, page = 1, limit = 20, isActive } = req.query;

    let query = {};
    if (role) query.role = role;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-password -refreshToken -twoFactorSecret')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      pages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -refreshToken -twoFactorSecret')
      .populate('enrolledCourses', 'title category thumbnail')
      .populate('children', 'name email avatar');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user (admin)
// @route   PUT /api/users/:id
exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, role, isActive, phone, bio } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (role) updates.role = role;
    if (isActive !== undefined) updates.isActive = isActive;
    if (phone) updates.phone = phone;
    if (bio) updates.bio = bio;

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select('-password -refreshToken');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user (admin)
// @route   DELETE /api/users/:id
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await user.deleteOne();

    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Link parent to child
// @route   POST /api/users/link-child
exports.linkChild = async (req, res, next) => {
  try {
    const { childEmail } = req.body;

    const child = await User.findOne({ email: childEmail, role: 'student' });
    if (!child) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const parent = await User.findById(req.user._id);

    if (parent.children.includes(child._id)) {
      return res.status(400).json({ success: false, message: 'Already linked' });
    }

    parent.children.push(child._id);
    await parent.save();

    child.parent = parent._id;
    await child.save();

    res.status(200).json({ success: true, message: 'Child linked successfully' });
  } catch (error) {
    next(error);
  }
};
