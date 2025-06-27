import Router from "router";
import {
	loginUser,
	logoutUser,
} from "../controllers/authApis/authControllers.js";

const authRouter = Router();

authRouter
	// post
	.post("/user/login", loginUser)
	.post("/user/logout", logoutUser);

export default authRouter;
