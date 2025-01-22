import { CoreResponseError } from "../../core/class/core.response.error.class.js";

import {
	createNewSocialPostService,
	getAllSocialPostService,
	deleteSocialPostService,
} from "../service/user.social.post.service.js";

import { asyncErrorLogger } from "../../core/service/core.error.logger.service.js";
import {
	sendJsonResponse,
	sendJsonResponseAndSetCookies,
} from "../../common/service/common.send.response.service.js";

const createNewSocialPostController = asyncErrorLogger(
	async (req, res, next) => {}
);

const getAllSocialPostController = asyncErrorLogger(
	async (req, res, next) => {}
);

const deleteSocialPostController = asyncErrorLogger(
	async (req, res, next) => {}
);

export {
	createNewSocialPostController,
	getAllSocialPostController,
	deleteSocialPostController,
};
