export const generateOtp = () => {
	const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
	const expiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
	console.log("OTP ", otp);
	return { otp: otp.toString(), expiry };
};
