const asyncHandler = require('express-async-handler');

const User = require('../models/UserModel');
const Artwork = require('../models/ArtworkModel');
const Comment = require('../models/CommentModel');

// @desc    get all reported items
// @route   GET admin/reportedArtworks
// @access  Admin
const getAllReportedArtworks = asyncHandler(async (req, res) => {
	try {
		// Find all users who have reported artworks
		const usersWithReportedArtworks = await User.find({
			reportedArtworks: { $exists: true, $not: { $size: 0 } },
		}).populate('reportedArtworks');

		// Aggregate reported artworks from different users
		const reportedArtworks = [];
		usersWithReportedArtworks.forEach((user) => {
			reportedArtworks.push(...user.reportedArtworks);
		});

		res.status(200).json({ status: 'success', reportedArtworks });
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});

// @desc    get all reported comments
// @route   GET admin/reportedComments
// @access  Admin
const getAllReportedComments = asyncHandler(async (req, res) => {
	try {
		// Find all users who have reported artworks
		const usersWithReportedComments = await User.find({
			reportedComments: { $exists: true, $not: { $size: 0 } },
		}).populate('reportedComments');

		// Aggregate reported comments from different users
		const reportedComments = [];
		usersWithReportedComments.forEach((user) => {
			reportedComments.push(...user.reportedComments);
		});

		res.status(200).json({ status: 'success', reportedComments });
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});

// @desc    delete reported artworks by id
// @route   DELETE admin/reportedArtworks/id
// @access  Admin
const deleteReportedArtworkById = asyncHandler(async (req, res) => {
	try {
		const artworkIdToDelete = req.params.id;

		// delete the artwork
		const deletedArtwork = await Artwork.findByIdAndDelete(artworkIdToDelete);

		if (!deletedArtwork) {
			return res.status(404).json({ error: 'Artwork not found' });
		}
		// Update users who had this artwork
		await User.updateMany({ artworks: artworkIdToDelete }, { $pull: { artworks: artworkIdToDelete } });

		res.status(200).json({ status: 'success', message: 'Artwork deleted successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server Error' });
	}
});

// @desc    delete reported comments by id
// @route   DELETE admin/reportedComments/id
// @access  Admin
const deleteReportedCommentById = asyncHandler(async (req, res) => {
	try {
		const commentIdToDelete = req.params.id;

		// delete the comment from all users' reportedComments arrays
		await User.updateMany({ reportedComments: commentIdToDelete }, { $pull: { reportedComments: commentIdToDelete } });

		// delete the comment
		const deletedComment = await Comment.findByIdAndDelete(commentIdToDelete);

		if (!deletedComment) {
			return res.status(404).json({ error: 'Comment not found' });
		}

		res.status(200).json({ status: 'success', message: 'Comment deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
});

module.exports = {
	getAllReportedArtworks,
	getAllReportedComments,
	deleteReportedArtworkById,
	deleteReportedCommentById,
};
