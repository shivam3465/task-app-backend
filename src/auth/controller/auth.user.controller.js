// import cloudinary from "cloudinary";

// import { setCookie } from "../utils/setCookies.js";

import { CoreResponseError } from "../../core/class/core.response.error.class.js";

import { AuthConfig } from "../config/auth.config.js";
import {
	logoutUserService,
	registerUserService,
	userLoginService,
	validateOtpOfUser,
	validateUserEmailAndSendOtp,
} from "../service/auth.user.service.js";
import { asyncErrorLogger } from "../../core/service/core.error.logger.service.js";
import {
	sendJsonResponse,
	sendJsonResponseAndSetCookies,
} from "../../common/service/common.send.response.service.js";

const loginUser = asyncErrorLogger(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(
			new CoreResponseError({
				message: AuthConfig.REQUIRED_FIELD_MISSING,
				statusCode: 400,
			})
		);
	}

	const userData = { email, password };
	const { response, error, cookieObj } = await userLoginService(userData);

	if (error) return next(error);

	//sending response and setting cookies in header
	sendJsonResponseAndSetCookies(res, response, 200, cookieObj);
});

const registerUser = asyncErrorLogger(async (req, res, next) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return next(
			new CoreResponseError({
				message: AuthConfig.REQUIRED_FIELD_MISSING,
				statusCode: 400,
			})
		);
	}

	// Check if email is valid
	const emailRegex = AuthConfig.EMAIL_REGEX;
	if (!emailRegex.test(email)) {
		return next(
			new CoreResponseError({
				message: AuthConfig.INVALID_EMAIL,
				statusCode: 400,
			})
		);
	}

	const userData = { name, email, password };
	const { response, error } = await registerUserService(userData);

	if (error) return next(error);

	return sendJsonResponse(res, response, 200);
});

const userForgotPassword = asyncErrorLogger(async (req, res, next) => {
	const { email } = req.body;

	if (!email) {
		return next(
			new CoreResponseError({
				message: AuthConfig.REQUIRED_FIELD_MISSING,
				statusCode: 400,
			})
		);
	}

	const { response, error } = await validateUserEmailAndSendOtp(email);

	if (error) return next(error);

	//sending response and setting cookies in header
	sendJsonResponse(res, response, 200);
});

const validateOTP = asyncErrorLogger(async (req, res, next) => {
	const { email, otp, password } = req.body;

	if (!email || !otp || !password) {
		return next(
			new CoreResponseError({
				message: AuthConfig.REQUIRED_FIELD_MISSING,
				statusCode: 400,
			})
		);
	}

	const { response, error } = await validateOtpOfUser(email, otp, password);

	if (error) return next(error);

	//sending response and setting cookies in header
	sendJsonResponse(res, response, 200);
});

const logoutUser = asyncErrorLogger(async (req, res) => {
	const { response, error, cookieObj } = await logoutUserService();

	if (error) return next(error);

	sendJsonResponseAndSetCookies(res, response, 200, cookieObj);
});

const getUserDetails = async (req, res) => {
	res.json({ success: true, user: req.user });
};

export {
	loginUser,
	registerUser,
	userForgotPassword,
	validateOTP,
	logoutUser,
	getUserDetails,
};
