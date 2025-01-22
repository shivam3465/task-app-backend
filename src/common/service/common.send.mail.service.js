import nodemailer from "nodemailer";
import { asyncErrorLogger } from "../../core/service/core.error.logger.service.js";

export const CommonMailSendingService = asyncErrorLogger(
	async (subject, message, receiverMail) => {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "meforcoding@gmail.com",
				pass: "buyfvfxpavngjjfu",
			},
		});

		await transporter.sendMail({
			to: receiverMail, // Receiver's email
			subject: subject,
			text: message, // Plain text body
		});
	}
);
