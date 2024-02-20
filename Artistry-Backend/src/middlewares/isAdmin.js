const User = require('../models/UserModel');

const isAdmin = async (req, res, next) => {
	//find the login user
	const user = await User.findById(req.userAuthId);

	if (user?.isAdmin) {
		next();
	} else {
		next(new Error('Access denied, admin only'));
	}
};

module.exports = isAdmin;
