// handel all errors
const globalErrorHandler = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	let message = err.message;

	// Handle duplicate key error
	if (err.code === 11000) {
		const field = Object.keys(err.keyValue)[0]; // This identifies the field with the duplicate key
		message = `An account with that ${field} already exists.`;
		statusCode = 400; // Bad Request
	}

	res.status(statusCode).json({
		status: 'error',
		message: message,
		stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
	});
};

//404 handler
const notFound = (req, res, next) => {
	const err = new Error(`Route ${req.originalUrl} not found`);
	next(err);
};

module.exports = { notFound, globalErrorHandler };
