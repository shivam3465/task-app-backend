import { CoreResponseError } from "../../core/class/core.response.error.class.js";

import {
	createNewSocialPostService,
	getAllSocialPostService,
	deleteSocialPostService,
} from "../service/user.social.post.service.js";

import { asyncErrorLogger } from "../../core/service/core.error.logger.service.js";
import { sendJsonResponse } from "../../common/service/common.send.response.service.js";
import { commonUploadMediaToCloudService } from "../../common/service/common.upload.media.service.js";
import { UserSocialPostConfig } from "../config/user.social.post.config.js";

const createNewSocialPostController = asyncErrorLogger(
	async (req, res, next) => {
		const { content, image } = req.body;
		const userId = req.user._id;

		if (!content || !image || !userId) {
			return next(
				new CoreResponseError({
					message:
						UserSocialPostConfig.RESPONSE_MESSAGE
							.REQUIRED_FIELDS_MISSING,
					statusCode: 400,
				})
			);
		}

		//upload the image to cloud
		const uploadedFile = await commonUploadMediaToCloudService(
			image,
			"image",
			UserSocialPostConfig.SOCIAL_MEDIA_FOLDER_NAME
		);

		if (!uploadedFile && uploadedFile.url) {
			return next(
				new CoreResponseError({
					message:
						UserSocialPostConfig.RESPONSE_MESSAGE
							.MEDIA_UPLOAD_FAILURE,
					statusCode: 400,
				})
			);
		}

		const { response, error } = await createNewSocialPostService({
			mediaObj: uploadedFile,
			content,
			userId,
		});
		if (error) return next(error);

		return sendJsonResponse(res, response, 200);
	}
);

const getAllSocialPostController = asyncErrorLogger(async (req, res, next) => {
	const { user } = req; //coming from auth middleware

	const { response, error } = await getAllSocialPostService({
		userId: user._id,
	});
	if (error) return next(error);

	return sendJsonResponse(res, response, 200);
});

const deleteSocialPostController = asyncErrorLogger(async (req, res, next) => {
	const { postId } = req.body;
	const userId = req.user._id; //coming from auth middleware

	// Validate required fields
	if (!postId || !userId) {
		return next(
			new CoreResponseError({
				message: UserSocialPostConfig.RESPONSE_MESSAGE.POST_NOT_FOUND,
				statusCode: 400,
			})
		);
	}

	const { response, error } = await deleteSocialPostService({
		postId,
		userId,
	});
	if (error) return next(error);

	return sendJsonResponse(res, response, 200);
});

export {
	createNewSocialPostController,
	getAllSocialPostController,
	deleteSocialPostController,
};
