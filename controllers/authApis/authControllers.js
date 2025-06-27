import User from "../../schemas/userSchema.js";
import bcrypt from "bcryptjs";
import getToken from "../../jwt/genToken.js";

export const loginUser = async (req, res) => {
	const { gmail, password } = req.body;

	if (!gmail || !password) {
		return res.status(400).json({ error: "All fields are required" });
	}

	try {
		const user = await User.findOne({ gmail });
		if (!user) {
			return res.status(400).json({
				message: "User not found, please register first!",
			});
		}

		const comparedPassword = await bcrypt.compare(password, user.password);
		if (!comparedPassword) {
			return res.status(401).json({
				error: "gmail or password is incorrect",
			});
		}

		const token = getToken(user._id);
		res.cookie("accessToken", token, {
			httpOnly: true,
			sameSite: "strict",
		})
			.status(200)
			.json({ message: "Login successful" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const logoutUser = async (req, res) => {
	try {
		res.clearCookie("accessToken", {
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production", // set true for HTTPS
		});
		res.status(200).json({ message: "Logout successful" });
	} catch (error) {
		res.status(500).json({ error: "Logout failed" });
	}
};
