const User = require('../schemas/userSchema');

const createUser = async (req, res) => {
  const { username, gmail, password } = req.body;
  if (!username || !gmail || !password) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }
  try {
    const user = await User.findOne({ gmail })
    if (user) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({message: "User created successfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//getAUser
const getAUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  } 
}

//getByqueryParams
const getByQuery = async (req, res) => {
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
}

// edit user
const editUser = async (req, res) => {
  const { id } = req.params;
  const { username, gmail, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, {
      username,
      gmail,
      password,
    });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
}

// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getAUser,
  getByQuery,
  editUser,
  deleteUser
};