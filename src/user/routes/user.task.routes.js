import express from "express";
import {
	getAllTaskController,
	createNewTaskController,
	updateTaskController,
	deleteTaskController,
} from "../controller/user.task.controller.js";

const router = express.Router();

router.route("/all").get(getAllTaskController);
router.route("/create").post(createNewTaskController);
router.route("/update").put(updateTaskController);
router.route("/delete").delete(deleteTaskController);

export default router;