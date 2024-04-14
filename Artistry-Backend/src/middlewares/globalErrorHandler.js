// handel all errors
const globalErrorHandler = (err, req, res, next) => {
	const stack = err?.stack;
	const message = err?.message;
	res.json({
		stack,
		message,
	});
};

//404 handler
const notFound = (req, res, next) => {
	const err = new Error(`Route ${req.originalUrl} not found`);
	next(err);
};

module.exports = { notFound, globalErrorHandler };
