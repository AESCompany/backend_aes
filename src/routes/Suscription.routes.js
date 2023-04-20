const { Router } = require("express");
const {
  validatorAddSuscription,
  validatorUnsuscribe,
} = require("../validators/Suscription");
const isAuth = require("../middleware/sessionAuth");
const checkrol = require("../middleware/roleAuth");

const suscriptionRoute = Router();
const suscriptionController = require("../controller/suscription/subscribers.controller");

suscriptionRoute.get(
  "/",
  isAuth,
  checkrol(["superadmin", "admin", "editor"]),
  suscriptionController.getAllSusribers
);

suscriptionRoute.post(
  "/",
  validatorAddSuscription,
  suscriptionController.addSuscription
);

suscriptionRoute.delete("/delete", suscriptionController.unsuscribeUser);

module.exports = suscriptionRoute;
