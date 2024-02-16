const express = require('express');
const {
	getAllReportedArtworks,
	getAllReportedComments,
	deleteReportedArtworkById,
	deleteReportedCommentById,
} = require('../controllers/AdminController');

const checkLoggedIn = require('../middlewares/checkLoggedIn');
const isAdmin = require('../middlewares/isAdmin');
const adminRoutes = express.Router();

adminRoutes
	.get('/reportedArtworks', checkLoggedIn, isAdmin, getAllReportedArtworks)
	.get('/reportedComments', checkLoggedIn, isAdmin, getAllReportedComments)
	.delete('/reportedArtworks/:id', checkLoggedIn, isAdmin, deleteReportedArtworkById)
	.delete('/reportedComments/:id', checkLoggedIn, isAdmin, deleteReportedCommentById);

module.exports = adminRoutes;
