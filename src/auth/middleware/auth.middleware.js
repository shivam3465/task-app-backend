import jwt from "jsonwebtoken";
import { UserCollection } from "../../user/model/user.detail.model.js";
import { AuthConfig } from "../config/auth.config.js";
import { CoreResponseError } from "../../core/class/core.response.error.class.js";

export const authenticatedRoute = async (req, res, next) => {
	const cookies = req.cookies;

	//if cookies not found
	if (!cookies) {
		return next(
			new CoreResponseError({
				message: AuthConfig.RESPONSE_MESSAGE.AUTHENTICATION_FAILED,
				statusCode: 401,
			})
		);
	}

	let token = cookies[AuthConfig.TOKEN_KEY];
	//if token not found
	if (!token) {
		return next(
			new CoreResponseError({
				message: AuthConfig.RESPONSE_MESSAGE.AUTHENTICATION_FAILED,
				statusCode: 401,
			})
		);
	}

	const id = jwt.verify(token, process.env.SECRET_KEY);
	const user = await UserCollection.findById(id).select(["-password"]);

	//if user not found
	if (!user) {
		return next(
			new CoreResponseError({
				message: AuthConfig.RESPONSE_MESSAGE.AUTHENTICATION_FAILED,
				statusCode: 401,
			})
		);
	}

	//if user found attaching user object to the request object
	req.user = user;
	next();
};
