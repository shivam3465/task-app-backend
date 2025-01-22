import { CoreResponseError } from "../../core/class/core.response.error.class.js";

import { asyncErrorLogger } from "../../core/service/core.error.logger.service.js";

const getAllSocialPostService = asyncErrorLogger(async (userData) => {});

const createNewSocialPostService = asyncErrorLogger(async (userData) => {});

const deleteSocialPostService = asyncErrorLogger(async (email) => {});

export {
	createNewSocialPostService,
	getAllSocialPostService,
	deleteSocialPostService,
};
