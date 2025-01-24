import mongoose from "mongoose";

const taskDataSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["Pending", "Ongoing", "Completed"], // Allowed values
			default: "Pending", // Default value
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
