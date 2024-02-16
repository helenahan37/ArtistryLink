const Comment = require('../models/CommentModel');

const checkCommentCreater = async (req, res, next) => {
	try {
		const comment = await Comment.findById(req.params.id);

		if (!comment) {
			return res.status(404).json({ status: 'error', message: 'Comment not found' });
		}

		// Check if the logged-in user is the creator of the comment
		if (comment.user.toString() !== req.userAuthId) {
			return res.status(403).json({ status: 'error', message: 'Unauthorized' });
		}
		next();
	} catch (err) {
		res.status(500).json({ status: 'error', message: 'Server Error' });
	}
};

module.exports = checkCommentCreater;
