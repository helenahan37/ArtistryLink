const asyncHandler = require('express-async-handler');
const Comment = require('../models/CommentModel');
const Artwork = require('../models/ArtworkModel');
const User = require('../models/UserModel');

// @desc    get all comments
// @route   GET comments/
// @access  Public
const getAllComments = asyncHandler(async (req, res) => {
	const comments = await Comment.find().populate('user', 'username');
	res.status(200).json({
		status: 'success',
		message: 'All comments',
		comments,
	});
});

// @desc    Get a specific comment by ID
// @route   GET /comment/:id
// @access  Public

const getCommentById = asyncHandler(async (req, res) => {
	const commentId = req.params.id;

	const comment = await Comment.findById(commentId).populate('user');

	res.status(200).json({
		status: 'success',
		message: 'Comment found',
		comment,
	});
});

// @desc    create new comment
// @route   POST comments/:artworkID
// @access  Private
const createComment = asyncHandler(async (req, res) => {
	const { content } = req.body;
	const userId = req.userAuthId;

	// Find the artwork
	const { artworkID } = req.params;

	const artworkFound = await Artwork.findById(artworkID).populate('comments');

	if (!artworkFound) {
		throw new Error('Artwork Not Found');
	}

	// Check if the user exists and fetch the user object
	const user = await User.findById(userId);
	if (!user) {
		throw new Error('User not found');
	}

	// Check if the user already commented on this artwork
	const hasCommented = artworkFound?.comments?.find((comment) => comment?.user?.toString() === userId.toString());
	if (hasCommented) {
		throw new Error('You have already commented on this artwork');
	}

	const comment = await Comment.create({
		user: userId,
		content,
		artwork: artworkFound?._id,
	});

	const populatedComment = await Comment.findById(comment?._id);

	// Push the comment ID into the artwork's comments array
	artworkFound.comments.push(comment._id);

	// Push the comment ID into the user's comments array
	user.comments.push(comment._id);

	// Save changes to both artwork and user
	await artworkFound.save();
	await user.save();

	// Populate artwork, user, and display comment content

	res.status(201).json({
		status: 'success',
		message: 'Comment created successfully',
		comment: populatedComment,
	});
});
//@desc    update comment
// @route   PATCH comments/:id/update
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
	const updateComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	}).populate('artwork', 'title');

	if (!updateComment) {
		throw new Error('Comment not found');
	}

	res.json({
		status: 'success',
		message: 'Comment updated successfully',
		updateComment,
	});
});

// @desc    delete comment
// @route   POST comments/:id/delete
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
	const comment = await Comment.findByIdAndDelete(req.params.id);
	const user = await User.findById(req.userAuthId);
	if (user) {
		// Remove the deleted artwork ID from the user's artworks array
		user.comments.pull(comment._id);
		await user.save();
	}

	res.json({
		status: 'success',
		message: 'Comment deleted successfully',
		comment,
	});
});

// @desc    report comment
// @route   POST comments/:id/report
// @access  Private
const reportComment = asyncHandler(async (req, res) => {
	const comment = await Comment.findById(req.params.id);

	if (!comment) {
		return res.status(404).json({ error: 'Comment not found' });
	}

	// turn the reported property of the comment to true
	comment.report = true;

	// update change
	await comment.save();

	// check the login user
	const user = await User.findById(req.userAuthId);

	// save the artwork id to the reportedArtworks array of the user
	if (!user.reportedComments.includes(comment._id)) {
		user.reportedComments.push(comment._id);
		await user.save();
	}

	res.status(200).json({ status: 'success', message: 'Comment reported successfully', comment });
});

module.exports = {
	getAllComments,
	getCommentById,
	createComment,
	updateComment,
	deleteComment,
	reportComment,
};
