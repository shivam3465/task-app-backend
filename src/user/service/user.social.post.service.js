import { CoreResponseError } from "../../core/class/core.response.error.class.js";

import { asyncErrorLogger } from "../../core/service/core.error.logger.service.js";
import { UserSocialPostConfig } from "../config/user.social.post.config.js";
import { SocialPostCollection } from "../model/user.social.post.model.js";

const createNewSocialPostService = asyncErrorLogger(
	async (socialsocialPostData) => {
		const { mediaObj, content, userId } = socialsocialPostData;

		await SocialPostCollection.create({
			content,
			media: mediaObj,
			userId,
		});

		return {
			response: {
				success: true,
				message:
					UserSocialPostConfig.RESPONSE_MESSAGE.POST_UPLOAD_SUCCESS,
			},
			error: null,
		};
	}
);

const getAllSocialPostService = asyncErrorLogger(async (socialPostData) => {
	const { userId } = socialPostData;

	// Fetch all social post for the user with user details
	const socialPost = await SocialPostCollection.find({
		userId,
	}).populate("userId");

	return {
		response: {
			success: true,
			message: UserSocialPostConfig.RESPONSE_MESSAGE.POST_FOUND_SUCCESS,
			data: socialPost,
		},
		error: null,
	};
});

const deleteSocialPostService = asyncErrorLogger(async (socialPostData) => {
	const { postId, userId } = socialPostData;

	// Find and delete the post
	const deletedPost = await SocialPostCollection.findOneAndDelete({
		_id: postId,
		userId: userId,
	});

	// Handle case when the post is not deleted
	if (!deletedPost) {
		return {
			response: null,
			error: new CoreResponseError({
				message:
					UserSocialPostConfig.RESPONSE_MESSAGE.POST_DELETED_FAILURE,
				statusCode: 404,
			}),
		};
	}

	return {
		response: {
			success: true,
			message: UserSocialPostConfig.RESPONSE_MESSAGE.POST_DELETED_SUCCESS,
		},
		error: null,
	};
});

export {
	createNewSocialPostService,
	getAllSocialPostService,
	deleteSocialPostService,
};
