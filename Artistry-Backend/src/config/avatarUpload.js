const dotenv = require('dotenv');
dotenv.config();

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//configure cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

// create cloudinary storage
const storage = new CloudinaryStorage({
	cloudinary,
	allowedFormats: ['jpg', 'png', 'jpeg'],
	params: {
		folder: 'artistconnect-avatars',
	},
});

//init multer with storage engine
//receive file that user is uploading
const avatarsUpload = multer({ storage });

module.exports = avatarsUpload;
