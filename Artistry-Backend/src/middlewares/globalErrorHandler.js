const globalErrorHandler = (err, req, res, next) => {
	const stack = process.env.NODE_ENV === 'development' ? err.stack : undefined; // Include stack trace only in development mode
	let statusCode = err.statusCode || 500;
	let message = err.message;

	// Handling MongoDB duplicate key errors (e.g., unique constraint violations)
	if (err.name === 'MongoError' && err.code === 11000) {
		// Extract the field name based on the field causing the duplicate key error
		const field = err.keyPattern ? Object.keys(err.keyPattern)[0] : 'field';
		message = `An account with that ${field} already exists.`;
		statusCode = 400;
	}

	// Customize or translate other MongoDB error messages or validation errors as needed
	if (err.name === 'ValidationError') {
		message = err.message;
		statusCode = 400;
	}

	res.status(statusCode).json({
		status: 'error',
		message,
		stack,
	});
};
//404 handler
const notFound = (req, res, next) => {
	const err = new Error(`Route ${req.originalUrl} not found`);
	next(err);
};

module.exports = { notFound, globalErrorHandler };
