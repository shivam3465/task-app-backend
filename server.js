import { app } from "./app.js";

import { config } from "dotenv";
config();

import cloudinary from "cloudinary";

import { connectDB } from "./src/core/service/core.connect.db.service.js";
import { ServerConfig } from "./src/common/config/common.server.config.js";

connectDB();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

//health check of server
app.get("/", (req, res) =>
	res.json({ success: true, message: ServerConfig.HEALTH_MESSAGE })
);

app.listen(process.env.PORT, () =>
	console.log("listening on port " + process.env.PORT)
);
