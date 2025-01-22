import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import cors from "cors";

import { mainErrorHandlerService } from "./src/core/service/core.main.error.handler.service.js";
import authRouter from "./src/auth/routers/user.js"

const app = express();
app.use(
	cors({
		origin: ["http://localhost:3000", process.env.FRONTEND_URL],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

// middlewares
app.use(express.json({ limit: "50mb" }));
app.use(urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRouter);

app.use("/", mainErrorHandlerService);

export { app };
