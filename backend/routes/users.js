const usersRouter = require("express").Router();
const {
  getUser,
  getUsers,
  createUser,
  updateAvatar,
  updateProfile,
  login,
} = require("../controllers/users");
const { auth } = require("../middlewares/auth");

usersRouter.post("/signup", createUser);
usersRouter.post("/signin", login);
usersRouter.use(auth);
usersRouter.get("/users", getUsers);
usersRouter.get("/users/me", getUser);
usersRouter.patch("/users/me", updateProfile);
usersRouter.patch("/users/me/avatar", updateAvatar);

module.exports = usersRouter;
