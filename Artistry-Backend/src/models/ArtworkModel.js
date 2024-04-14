const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},

		artworkImg: {
			type: String, // URL of uploaded photo
			required: [true, 'Please upload an image'],
		},
		title: {
			type: String,
			required: [true, 'Please provide a title'],
		},
		description: {
			type: String,
			required: true,
			unique: false,
		},
		genre: {
			type: String,
			required: [true, 'Please select a genre'],
			enum: [
				'Modern',
				'Impressionist',
				'Contemporary',
				'Surrealist',
				'Pop Art',
				'Cubist',
				'Abstract',
				'Graffiti/Street-Art',
				'Other',
			],
		},
		medium: {
			type: String,
			required: [true, 'Please select a medium'],
			enum: [
				'Oil Painting',
				'Acrylic Painting',
				'Watercolor painting',
				'Ink Drawing',
				'Pencil Drawing',
				'Sculpture',
				'Mixed Media',
				'Photography',
				'Other',
			],
		},
		comments: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Comment',
				required: false,
			},
		],
		favorite: {
			type: Boolean,
			default: false,
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

ArtworkSchema.virtual('username', {
	ref: 'User',
	localField: 'user',
	foreignField: '_id',
	justOne: true,
	options: { select: 'username' },
});

const Artwork = mongoose.model('Artwork', ArtworkSchema);
module.exports = Artwork;
