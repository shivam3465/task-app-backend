import mongoose from "mongoose";
import { CoreResponseError } from "../../core/class/core.response.error.class.js";
import { asyncErrorLogger } from "../../core/service/core.error.logger.service.js";
import { UserTaskConfig } from "../config/user.task.config.js";
import { TaskCollection } from "../model/user.task.model.js";

const createNewTaskService = asyncErrorLogger(async (taskData) => {
	const { title, desc, userId } = taskData;

	const taskObj = {
		title,
		description: desc,
		userId,
		status: "Pending",
	};

	await TaskCollection.create(taskObj);

	return {
		response: {
			success: true,
			message:
				UserTaskConfig.RESPONSE_MESSAGE.TASK_REGISTER_SUCCESS_MESSAGE,
		},
		error: null,
	};
});

const getAllTaskService = asyncErrorLogger(async (taskData) => {
	const { userId } = taskData;

	// Fetch all tasks for the user
	const tasks = await TaskCollection.find({
		userId,
	});

	// Categorize tasks by their status
	const taskObj = {
		Pending: [],
		Completed: [],
		Ongoing: [],
	};

	tasks.forEach((task) => {
		if (task.status === "Pending") {
			taskObj.Pending.push(task);
		} else if (task.status === "Completed") {
			taskObj.Completed.push(task);
		} else if (task.status === "Ongoing") {
			taskObj.Ongoing.push(task);
		}
	});

	return {
		response: {
			success: true,
			message: UserTaskConfig.RESPONSE_MESSAGE.TASK_FOUND_SUCCESSFULLY,
			tasks: taskObj,
		},
		error: null,
	};
});

const updateTaskService = asyncErrorLogger(async (taskData) => {
	const { taskId, userId, updateFields } = taskData;

	// Find and update the task
	const updatedTask = await TaskCollection.findOneAndUpdate(
		{ _id: taskId, userId: userId },
		updateFields,
		{ new: true }
	);

	// Handle case when the updated task is not found
	if (!updatedTask) {
		throw new CoreResponseError({
			message: UserTaskConfig.RESPONSE_MESSAGE.UPDATE_FAILED,
			statusCode: 404,
		});
	}

	return {
		response: {
			success: true,
			message: UserTaskConfig.RESPONSE_MESSAGE.TASK_UPDATED_SUCCESS,
		},
		error: null,
	};
});

const deleteTaskService = asyncErrorLogger(async (taskData) => {
	const { taskId, userId } = taskData;

	// Find and delete the task
	const deletedTask = await TaskCollection.findOneAndDelete({
		_id: taskId,
		userId: userId,
	});

	console.log("del", deletedTask);
	// Handle case when the task is not found
	if (!deletedTask) {
		throw new CoreResponseError({
			message: UserTaskConfig.RESPONSE_MESSAGE.TASK_DELETE_FAILED,
			statusCode: 404,
		});
	}

	return {
		response: {
			success: true,
			message: UserTaskConfig.RESPONSE_MESSAGE.TASK_DELETE_SUCCESS,
		},
		error: null,
	};
});

export {
	createNewTaskService,
	deleteTaskService,
	getAllTaskService,
	updateTaskService,
};
