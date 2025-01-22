import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

import { UserCollection } from "../../user/model/user.detail.model.js";
import { CoreResponseError } from "../../core/class/core.response.error.class.js";
import { AuthConfig } from "../config/auth.config.js";
import { asyncErrorLogger } from "../../core/service/core.error.logger.service.js";
import { CommonMailSendingService } from "../../common/service/common.send.mail.service.js";
import { generateOtp } from "../../common/utils/tools.utils.js";

const userLoginService = asyncErrorLogger(async (userData) => {
	const { email, password } = userData;
	const user = await UserCollection.findOne({ email })
		.select("+password")
		.lean();

	//duplicate user check
	if (!user) {
		return {
			response: null,
			error: new CoreResponseError({
				message: AuthConfig.USER_NOT_FOUND,
				statusCode: 401,
			}),
		};
	}

	const passwordMatched = await compare(password, user.password);

	if (!passwordMatched) {
		return {
			response: null,
			error: new CoreResponseError({
				message: AuthConfig.WRONG_CREDENTIALS,
				statusCode: 401,
			}),
		};
	}

	const hashedUserId = jwt.sign(user._id.toString(), process.env.SECRET_KEY);

	const cookieObj = {
		name: AuthConfig.TOKEN_KEY,
		value: hashedUserId,
		expireTime: AuthConfig.TOKEN_EXPIRE_TIME,
	};

	return {
		response: {
			success: true,
			message: AuthConfig.LOGIN_SUCCESS,
		},
		error: null,
		cookieObj,
	};
});

const registerUserService = asyncErrorLogger(async (userData) => {
	const { name, email, password } = userData;
	const user = await UserCollection.findOne({ email });

	//duplicate user check
	if (user) {
		return {
			response: null,
			error: new CoreResponseError({
				message: AuthConfig.DUPLICATE_USER,
				statusCode: 400,
			}),
		};
	}

	const encryptedPassword = await hash(
		password,
		AuthConfig.PASSWORD_SALT_ROUND
	);

	//save new user in db
	await UserCollection.create({
		name,
		email,
		password: encryptedPassword,
	});

	return {
		response: {
			success: true,
			message: AuthConfig.REGISTER_SUCCESS_MESSAGE,
		},
		error: null,
	};
});

const validateUserEmailAndSendOtp = asyncErrorLogger(async (email) => {
	const user = await UserCollection.findOne({ email });

	//check if user exists or not
	if (!user) {
		return {
			response: null,
			error: new CoreResponseError({
				message: AuthConfig.USER_NOT_FOUND,
				statusCode: 401,
			}),
		};
	}

	const { otp, expiry } = generateOtp();

	// Update user document with OTP and expiry
	user.resetOtp = otp;
	user.resetOtpExpiry = new Date(expiry);
	await user.save();

	const messageWithOtp = `Dear User,\n
     Your One Time Password (OTP) for resetting the password is ${otp}`;

	await CommonMailSendingService(
		"OTP for login from Affworld.co",
		messageWithOtp,
		email
	);

	return {
		response: {
			success: true,
			message: AuthConfig.OTP_SENT_SUCCESS,
		},
		error: null,
	};
});

const validateOtpOfUser = asyncErrorLogger(async (email, otp, password) => {
	const user = await UserCollection.findOne({ email }).select(
		"+resetOtp +resetOtpExpiry"
	);

	//check if user exists or not
	if (!user) {
		return {
			response: null,
			error: new CoreResponseError({
				message: AuthConfig.USER_NOT_FOUND,
				statusCode: 401,
			}),
		};
	}

	// Check if OTP matches and is not expired
	if (user.resetOtp !== otp || user.resetOtpExpiry < new Date()) {
		return {
			response: null,
			error: new CoreResponseError({
				message: AuthConfig.OTP_MISMATCHED,
				statusCode: 400,
			}),
		};
	}

	// Hash the new password
	const hashedPassword = await hash(password, 10);

	// Update the user's password and clear the OTP fields
	user.password = hashedPassword;
	user.resetOtp = undefined;
	user.resetOtpExpiry = undefined;

	await user.save();

	return {
		response: {
			success: true,
			message: AuthConfig.PASSWORD_RESET_SUCCESS,
		},
		error: null,
	};
});

const logoutUserService = asyncErrorLogger(async () => {
	const cookieObj = {
		name: AuthConfig.TOKEN_KEY,
		value: "",
		expireTime: 0,
	};

	return {
		response: {
			success: true,
			message: AuthConfig.LOGOUT_SUCCESS,
		},
		error: null,
		cookieObj,
	};
});

export {
	userLoginService,
	registerUserService,
	validateUserEmailAndSendOtp,
	validateOtpOfUser,
	logoutUserService,
};
