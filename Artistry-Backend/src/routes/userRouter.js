const express = require('express');
const {
	registerUser,
	loginUser,
	getUserProfile,
	getUserProfileById,
	updateUserDetails,
	deleteUser,
} = require('../controllers/UserController');

const checkLoggedIn = require('../middlewares/checkLoggedIn');
const avatarsUpload = require('../config/avatarUpload');
const userRoutes = express.Router();

userRoutes
	.post('/register', registerUser)
	.post('/login', loginUser)
	.get('/profile/:userId?', checkLoggedIn, getUserProfile) // Access for logged-in users and only account owner can access the profile
	.patch('/settings', checkLoggedIn, avatarsUpload.single('file'), updateUserDetails) //Access for logged-in users and only account owner can access the setting page
	.delete('/settings/delete', checkLoggedIn, deleteUser); //Access for logged-in users and only account owner can delete the account

module.exports = userRoutes;
