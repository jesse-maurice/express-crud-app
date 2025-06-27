import User from "../../schemas/userSchema.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
	const { username, gmail, password } = req.body;
	if (!username || !gmail || !password) {
		res.status(400).json({ error: "All fields are required" });
		return;
	}
	try {
		const user = await User.findOne({ gmail });
		if (user) {
			res.status(400).json({ error: "User already exists" });
			return;
		}
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);
		const newUser = new User({ ...req.body, password: hashedPassword });
		await newUser.save();
		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
