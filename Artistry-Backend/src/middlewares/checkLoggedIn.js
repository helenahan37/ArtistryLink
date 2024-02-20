const getToken = require('../utils/getToken');
const verifyToken = require('../utils/verifyToken');

const checkLoggedIn = (req, res, next) => {
	//get token from header
	const token = getToken(req);
	//verify the token
	const decodedUser = verifyToken(token);
	if (!decodedUser) {
		throw new Error('Invalid/Expired token, please login again');
	} else {
		//save the user into req obj
		req.userAuthId = decodedUser?.id;
		next();
	}
};
module.exports = checkLoggedIn;
