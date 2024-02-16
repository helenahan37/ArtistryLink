const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
	{
		artwork: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Artwork',
			required: [true, 'Comment must belong to an artwork'],
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Comment must belong to a user'],
		},
		content: {
			type: String,
			required: true,
		},
		report: {
			type: Boolean,
			default: false,
		},
	},
	{
		toJSON: { virtuals: true },
	}
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
