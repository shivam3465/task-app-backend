import { CoreResponseError } from "../../core/class/core.response.error.class.js";

import {
	getAllTaskService,
	createNewTaskService,
	updateTaskService,
	deleteTaskService,
} from "../service/user.task.service.js";
import { asyncErrorLogger } from "../../core/service/core.error.logger.service.js";
import { sendJsonResponse } from "../../common/service/common.send.response.service.js";
import { UserTaskConfig } from "../config/user.task.config.js";

const createNewTaskController = asyncErrorLogger(async (req, res, next) => {
	const { title, desc } = req.body;
	const { user } = req; //coming from auth middleware

	if (!title || !desc || !user._id) {
		return next(
			new CoreResponseError({
				message:
					UserTaskConfig.RESPONSE_MESSAGE.REQUIRED_FIELDS_MISSING,
				statusCode: 400,
			})
		);
	}

	const { response, error } = await createNewTaskService({
		title,
		desc,
		userId: user._id,
	});
	if (error) return next(error);

	return sendJsonResponse(res, response, 200);
});

const getAllTaskController = async (req, res) => {
	const { user } = req; //coming from auth middleware

	const { response, error } = await getAllTaskService({
		userId: user._id,
	});
	if (error) return next(error);

	return sendJsonResponse(res, response, 200);
};

const updateTaskController = asyncErrorLogger(async (req, res, next) => {
	const { taskId, title, description, status } = req.body;
	const { user } = req; //coming from auth middleware
	const userId = user._id;

	// Validate required fields
	if (!taskId || !userId) {
		throw new CoreResponseError({
			message: UserTaskConfig.RESPONSE_MESSAGE.TASK_NOT_FOUND,
			statusCode: 400,
		});
	}

	// Validate status if provided
	if (status && !UserTaskConfig.VALID_TASK_STATUS.includes(status)) {
		throw new CoreResponseError({
			message: UserTaskConfig.RESPONSE_MESSAGE.INVALID_UPDATE_FIELDS,
			statusCode: 400,
		});
	}

	// Dynamically build the update object
	const updateFields = {};
	if (title) updateFields.title = title;
	if (description) updateFields.description = description;
	if (status) updateFields.status = status;

	// Ensure there are fields to update
	if (Object.keys(updateFields).length === 0) {
		throw new CoreResponseError({
			message: UserTaskConfig.RESPONSE_MESSAGE.INVALID_UPDATE_FIELDS,
			statusCode: 400,
		});
	}

	const { response, error } = await updateTaskService({
		taskId,
		userId,
		updateFields,
	});
	if (error) return next(error);

	return sendJsonResponse(res, response, 200);
});

const deleteTaskController = asyncErrorLogger(async (req, res) => {
	const { taskId } = req.body;
	const { user } = req; //coming from auth middleware
	const userId = user._id;

	// Validate required fields
	if (!taskId || !userId) {
		throw new CoreResponseError({
			message: UserTaskConfig.RESPONSE_MESSAGE.TASK_NOT_FOUND,
			statusCode: 400,
		});
	}

	const { response, error } = await deleteTaskService({
		taskId,
		userId,
	});
	if (error) return next(error);

	return sendJsonResponse(res, response, 200);
});

export {
	getAllTaskController,
	createNewTaskController,
	updateTaskController,
	deleteTaskController,
};
