import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
			select: false, // won't be returned in default queries
		},
		resetOtp: {
			type: String,
			select: false, // won't be returned in default queries
		},
		resetOtpExpiry: {
			type: Date,
			select: false, // won't be returned in default queries
		},
	},
	{ timestamps: true } // for storing createdAt and updatedAt time
);

export const UserCollection = mongoose.model("user", userDataSchema);
