import express from "express";
import {
	getUserDetailsController,
	loginUserController,
	logoutUserController,
	registerUserController,
	userForgotPasswordController,
	validateOTPController,
} from "../controller/auth.controller.js";
import { authenticatedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/register").post(registerUserController);
router.route("/login").post(loginUserController);
router.route("/forgot-password").post(userForgotPasswordController);
router.route("/validate-otp").post(validateOTPController);
router.route("/logout").get(logoutUserController);

//to get user profile
router.route("/me").get(authenticatedRoute, getUserDetailsController);

export default router;
