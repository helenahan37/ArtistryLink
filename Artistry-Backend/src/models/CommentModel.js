const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Artwork',
			required: [true, 'Comment must belong to an artwork'],
		},
		author: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
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
