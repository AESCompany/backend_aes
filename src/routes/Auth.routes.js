const { Router } = require("express");
const AuthController = require("../controller/auth/auth.controller");
const { validatorAuthLogin } = require("../validators/User");
const isAuth = require("../middleware/sessionAuth");
const handlerHttpError = require("../utils/handlerHttpError");

const authRoute = Router();

authRoute.post("/login", validatorAuthLogin, AuthController.authLogin);
authRoute.post("/logout", AuthController.logOut);
authRoute.get("/dashboard", isAuth, (req, res) => {
  try {
    res.send({ message: true });
  } catch (error) {
    handlerHttpError(res, "Renueva tu token", 500);
  }
});
authRoute.post("/:id/reset-password", AuthController.changePassword);
authRoute.post("/:id/change-password", AuthController.changePasswordSuperAdmin);

module.exports = authRoute;
