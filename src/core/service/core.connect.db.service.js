import mongoose from "mongoose";
import { ServerConfig } from "../../common/config/common.server.config.js";

export const connectDB = () => {
	mongoose
		.connect(process.env.MONGO_URI, { dbName: ServerConfig.DB_NAME })
		.then((e) => console.log("database connected successfully"))
		.catch((e) => console.log(e));
};
