const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

// @desc    Register user
// @route   POST users/register
// @access  Private
const registerUser = asyncHandler(async (req, res) => {
	const { email, password, username, isAdmin } = req.body;
	//Check user exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		//throw
		throw new Error('User already exists');
	}

	//hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	//create the user
	const user = await User.create({
		username,
		email,
		password: hashedPassword,
		isAdmin,
	});
	res.status(201).json({
		status: 'success',
		message: 'User Registered Successfully',
		data: user,
	});
});

// @desc    Login user
// @route   POST users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	//Find the user in db by email only
	const user = await User.findOne({
		email,
	});
	if (user && (await bcrypt.compare(password, user?.password))) {
		res.json({
			status: 'success',
			message: 'User logged in successfully',
			user,
			token: generateToken(user?._id),
		});
	} else {
		throw new Error('Invalid login credentials');
	}
});

// @desc    Get user profile
// @route   GET users/profile
// @access  Private/Admin
const getUserProfile = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req?.userAuthId).populate('artworks').populate('comments').populate('favArtworks');

		res.json({
			status: 'success',
			message: 'User profile fetched successfully',
			user,
		});
	} catch {
		throw new Error('You do not have access to this profile');
	}
});

// @desc    Update user details
// @route   PATCH users/settings
// @access  Private
const updateUserDetails = asyncHandler(async (req, res) => {
	const { username, email, password, bio } = req.body;

	// hash password
	let hashedPassword = password; // Initialize with the provided password
	if (password) {
		const salt = await bcrypt.genSalt(10);
		hashedPassword = await bcrypt.hash(password, salt);
	}

	const updateData = {
		username,
		email,
		bio,
	};
	//only update password if there is a password
	if (password) {
		const salt = await bcrypt.genSalt(10);
		updateData.password = await bcrypt.hash(password, salt);
	}
	//only update avatar if there is a file
	if (req.file) {
		updateData.userAvatarImg = req.file.path;
	}

	const user = await User.findByIdAndUpdate(req.userAuthId, updateData, { new: true });

	// Send response
	res.json({
		status: 'success',
		message: 'User details updated successfully',
		user,
		token: generateToken(user?._id),
	});

	await user.save();
});

// @desc    fetch user profile by id
// @route   GET users/:id/profile
// @access  public
const getUserProfileById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).populate('artworks').populate('comments');
	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	res.status(200).json({ status: 'success', user });
});

// @desc    delete user
// @route   DELETE /users/settings/delete
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findByIdAndDelete(req.userAuthId);

	res.json({
		status: 'success',
		message: 'User deleted successfully',
		user,
	});
});

module.exports = {
	registerUser,
	loginUser,
	getUserProfile,
	getUserProfileById,
	updateUserDetails,
	deleteUser,
};
