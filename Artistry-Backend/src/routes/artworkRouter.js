const express = require('express');
const {
	uploadArtwork,
	getAllArtworks,
	getArtworkById,
	updateArtwork,
	deleteArtwork,
	reportArtwork,
	favoriteArtwork, 
	unfavoriteArtwork
} = require('../controllers/ArtworkController');

const checkLoggedIn = require('../middlewares/checkLoggedIn');
const checkArtworkCreator = require('../middlewares/checkArtworkCreator');
const artworksUpload = require('../config/artworkUpload');
const artworkRoutes = express.Router();

artworkRoutes
	.get('/', getAllArtworks)
	.get('/:id', getArtworkById)
	.post('/upload', checkLoggedIn, artworksUpload.single('file'), uploadArtwork)
	.post('/:id/report', checkLoggedIn, reportArtwork)
	.post('/:id/favorite', checkLoggedIn, favoriteArtwork) 
	.delete('/:id/favorite', checkLoggedIn, unfavoriteArtwork)
	.patch('/:id/update', checkLoggedIn, checkArtworkCreator, updateArtwork)
	.delete('/:id/delete', checkLoggedIn, checkArtworkCreator, deleteArtwork);

module.exports = artworkRoutes;
