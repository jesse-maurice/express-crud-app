import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getAUser,
  getByQuery,
  editUser,
  editProfile,
  deleteUser,
} from "../controllers/userApi/barrel.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = Router();

const adminCheck = async (req, res, next) => {
  const user = req.user;
  if (user.AltimaAdmin === true) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You are not authorized to access this route" });
  }
};

userRouter
  //post
  .post("/user/create", createUser)
  //get
  .get("/users", authMiddleware, getAllUsers)
  .get("/user/:id", getAUser)
  .get("/usersByquery", getByQuery)
  //put
  .put("/user/update/:id", authMiddleware, editUser)
  .put("/profile/update/:id", authMiddleware, editProfile)

  //delete
  .delete("/user/delete/:id", authMiddleware, deleteUser);

export default userRouter;
