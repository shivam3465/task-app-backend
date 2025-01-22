import jwt from "jsonwebtoken";
import { UserCollection } from "../../user/model/user.detail.model.js";
import { AuthConfig } from "../config/auth.config.js";

export const authenticatedRoute = async (req, res, next) => {
	const cookies = req.cookies;
	console.log("cookies ", cookies, cookies[AuthConfig.TOKEN_KEY]);
	if (cookies) {
		let token = cookies[AuthConfig.TOKEN_KEY];
		const id = jwt.verify(token, process.env.SECRET_KEY);

		const user = await UserCollection.findById(id).select(["-password"]);
		req.user = user;
		next();
	} else {
		res.status(400).json({ success: false, message: "Login required " });
	}
};
