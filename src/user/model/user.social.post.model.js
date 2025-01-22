import mongoose from "mongoose";

const postDataSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		media: {
			public_id: String,
			url: String,
			resource_type: String,
		},
		//stores user Id for this post
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true, // Added this to enforce that every post must have a user
		},
	},
	{ timestamps: true } // for storing createdAt and updatedAt time
);

export const SocialPostCollection = mongoose.model("post", postDataSchema);
