import express from "express";
import {
	createNewSocialPostController,
	getAllSocialPostController,
	deleteSocialPostController,
} from "../controller/user.social.post.controller.js";

const router = express.Router();

router.route("/create").post(createNewSocialPostController);
router.route("/all").get(getAllSocialPostController);
router.route("/delete").delete(deleteSocialPostController);

export default router;
