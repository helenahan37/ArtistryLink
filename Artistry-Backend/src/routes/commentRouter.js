const express = require('express');
const {
	getAllComments,
	getCommentById,
	createComment,
	updateComment,
	deleteComment,
	reportComment,
} = require('../controllers/CommentController');

const checkLoggedIn = require('../middlewares/checkLoggedIn');
const checkCommentCreator = require('../middlewares/checkCommentCreator');
const commentRoutes = express.Router();

commentRoutes
	.get('/', getAllComments)
	.get('/:id', getCommentById)
	.post('/:artworkID', checkLoggedIn, createComment) //any logged-in user can create a comment
	.post('/:id/report', checkLoggedIn, reportComment) //any logged-in user can report a comment
	.patch('/:id/update', checkLoggedIn, checkCommentCreator, updateComment) //only the creator of the comment can update it
	.delete('/:id/delete', checkLoggedIn, checkCommentCreator, deleteComment); //only the creator of the comment can delete it

module.exports = commentRoutes;
