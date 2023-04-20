const { Router } = require("express");
const userController = require("../controller/user/user.controller");

const {
  validatorGetItems,
  validatorCreateUser,
  validateUpdate,
} = require("../validators/User");
const isAuth = require("../middleware/sessionAuth");
const checkrol = require("../middleware/roleAuth");

const userRoute = Router();

userRoute.get(
  "/",
  isAuth,
  checkrol(["superadmin", "admin"]),
  userController.getAllItems
);
userRoute.post(
  "/",
  isAuth,
  checkrol(["superadmin", "admin"]),
  validatorCreateUser,
  userController.createUser
);
userRoute.get(
  "/:id",
  isAuth,
  checkrol(["superadmin", "admin", "editor"]),
  validatorGetItems,
  userController.detailUser
);
userRoute.put(
  "/:id",
  isAuth,
  checkrol(["superadmin", "admin", "editor"]),
  validatorGetItems,
  validateUpdate,
  userController.updateUser
);
userRoute.delete(
  "/:id",
  isAuth,
  checkrol(["superadmin", "admin"]),
  validatorGetItems,
  userController.deleteUser
);

module.exports = userRoute;
