const Artwork = require('../models/ArtworkModel');

const checkArtworkCreator = async (req, res, next) => {
	try {
		const artwork = await Artwork.findById(req.params.id);

		if (!artwork) {
			return res.status(404).json({ status: 'error', message: 'Artwork not found' });
		}

		// Check if the logged-in user is the creator of the artwork
		if (artwork.user.toString() !== req.userAuthId) {
			return res.status(403).json({ status: 'error', message: 'Unauthorized' });
		}

		next();
	} catch (err) {
		res.status(500).json({ status: 'error', message: 'Server Error' });
	}
};

module.exports = checkArtworkCreator;
