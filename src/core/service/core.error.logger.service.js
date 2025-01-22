import { CoreResponseError } from "../class/core.response.error.class.js";

export const asyncErrorLogger = (fun) => {
	return async (...args) => {
		try {
			// Await and return the result of the wrapped function
			return await fun(...args);
		} catch (err) {
			console.error("Error occurred:", err);
			throw new CoreResponseError({
				message: "Internal Server Error",
				statusCode: 500,
			});
		}
	};
};
