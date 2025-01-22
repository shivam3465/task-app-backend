import express from "express";
import {
	getUserDetails,
	loginUser,
	logoutUser,
	registerUser,
	userForgotPassword,
	validateOTP,
} from "../controller/auth.user.controller.js";
import { authenticatedRoute } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(userForgotPassword);
router.route("/validate-otp").post(validateOTP);
router.route("/logout").get(logoutUser);

//to get user profile
router.route("/me").get(authenticatedRoute, getUserDetails);

export default router;
