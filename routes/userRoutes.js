const Router = require("router");
const {createUser, getAllUsers, getAUser, getByQuery, editUser, deleteUser} = require("../controllers/userController");
const userRouter = Router();


userRouter
  .post("/user/create", createUser)
  .get("/users", getAllUsers)
  .get("/user/:id", getAUser)
  .get("/usersByquery", getByQuery)
  .put("/user/update/:id", editUser)
  .delete("/user/delete/:id", deleteUser);


module.exports = userRouter;