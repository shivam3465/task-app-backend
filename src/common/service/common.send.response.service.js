const sendJsonResponse = (res, responseObj = {}, statusCode = 200) => {
	return res.status(statusCode).json(responseObj);
};

const sendJsonResponseAndSetCookies = (
	res,
	responseObj = {},
	statusCode = 200,
	cookieObject
) => {
	//expireTime in millisecond like 3600*1000 ms for 1 hour expiry
	const { name, value, expireTime } = cookieObject;
	let cookieExpiryTime = 0;
	if (expireTime) cookieExpiryTime = new Date(Date.now() + expireTime);

	return res
		.status(statusCode)
		.cookie(name, value, {
			expires: cookieExpiryTime,
			httpOnly: true,
			sameSite: "none",
			secure: true,
		})
		.json(responseObj);
};

export { sendJsonResponse, sendJsonResponseAndSetCookies };
