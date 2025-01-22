import mongoose from "mongoose";

const taskDataSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: Boolean,
			default: false,
			required: true,
		},
		//stores user Id for this task
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true, // Added this to enforce that every task must have a user
		},
	},
	{ timestamps: true } // for storing createdAt and updatedAt time
);

export const TaskCollection = mongoose.model("task", taskDataSchema);
