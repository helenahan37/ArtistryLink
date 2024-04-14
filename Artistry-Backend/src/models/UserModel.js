const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: [true, 'Username is required'],
		trim: true,
		lowercase: true,
		validate: {
			validator: function (value) {
				return value.length >= 4;
			},
			message: 'Username must contain at least 4 characters',
		},
	},
	email: {
		type: String,
		required: [true, 'Please provide your email'],
		unique: true,
		lowercase: true,
		trim: true,
		validate: [validator.isEmail, 'Please provide a valid email'],
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		validate: {
			validator: function (value) {
				return value.length >= 4;
			},
			message: 'Password must contain at least 4 characters',
		},
	},
	artworks: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Artwork',
			required: false,
		},
	],
	comments: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Comment',
			required: false,
		},
	],
	bio: {
		type: String,
		required: false,
		unique: false,
		trim: true,
		default: 'Write something about yourself',
	},
	userAvatarImg: {
		type: [String],
		required: false,
		unique: false,
		default:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},

	favArtworks: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Artwork',
			required: false,
		},
	],
	reportedArtworks: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Artwork',
			required: false,
		},
	],
	reportedComments: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Comment',
			required: false,
		},
	],
	isAdmin: {
		type: Boolean,
		default: false,
	},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
