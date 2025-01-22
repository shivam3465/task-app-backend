import cloudinary from "cloudinary";
import { asyncErrorLogger } from "../../core/service/core.error.logger.service.js";

export const commonUploadMediaToCloudService = asyncErrorLogger(
	async (media, mediaType = "image", folder) => {
		const uploadedFile = await cloudinary.v2.uploader.upload(media, {
			folder: folder,
			resource_type: mediaType,
		});

		const { public_id, url, resource_type } = uploadedFile;

		return { public_id, url, resource_type };
	}
);
