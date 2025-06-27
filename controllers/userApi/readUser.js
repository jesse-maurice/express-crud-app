import User from "../../schemas/userSchema.js";

//get all users
export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find().select("-password");
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// get a user
export const getAUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// get by query
export const getByQuery = async (req, res) => {
	const { username, gmail } = req.query;

	const filter = {};
	if (username) {
		filter.username = username;
	}
	if (gmail) {
		filter.gmail = gmail;
	}
	try {
		const user = await User.find(filter);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
