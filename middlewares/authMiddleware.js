import jwt from "jsonwebtoken";
import userModel from "../schemas/userSchema.js";

const authMiddleware = async (req, res, next) => {
	const accessToken = req.cookies.accessToken;
	const jwtSecret = process.env.JWT_SECRET;

	if (!accessToken) {
		return res.status(401).json({ message: "Please login first" });
	}

	try {
		const decoded = jwt.verify(accessToken, jwtSecret);
		if (!decoded) {
			return res.status(401).json({ message: "Invalid token" });
		}

		const user = await userModel
			.findById(decoded.userId)
			.select("-password");

		if (!user) {
			return res.status(401).json({ message: "Invalid Id" });
		}

		req.user = user;
		next();
	} catch (error) {
		return res.status(500).json(error);
	}
};

export default authMiddleware;
