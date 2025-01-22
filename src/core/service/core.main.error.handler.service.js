export const mainErrorHandlerService = (error, req, res, next) => {
	console.error(error);

	const { statusCode, message, ...rest } = error;
	res.status(statusCode || 500).json({ success: false, message, ...rest });
};
