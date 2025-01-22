import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import cors from "cors";

import { mainErrorHandlerService } from "./src/core/service/core.main.error.handler.service.js";

import authRouter from "./src/auth/routes/auth.routes.js";
import taskRouter from "./src/user/routes/user.task.routes.js";
import socialPostRouter from "./src/user/routes/user.social.post.routes.js";

import { authenticatedRoute } from "./src/auth/middleware/auth.middleware.js";

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

//**************************    Authenticated Routes   ***************************
app.use("/api/v1/task", authenticatedRoute, taskRouter);
app.use("/api/v1/post", authenticatedRoute, socialPostRouter);

app.use("/", mainErrorHandlerService);

export { app };
