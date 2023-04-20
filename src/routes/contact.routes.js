const { Router } = require("express");
const contactController = require("../controller/contact.controller");
const { validatorContact } = require("../validators/contact");
const isAuth = require("../middleware/sessionAuth");
const checkrol = require("../middleware/roleAuth");
const contactRoute = Router();

contactRoute.get(
  "/",
  isAuth,
  checkrol(["superadmin", "admin", "editor"]),
  contactController.showMessage
);
contactRoute.get(
  "/:id",
  isAuth,
  checkrol(["superadmin", "admin", "editor"]),
  contactController.getContactbyId
);
contactRoute.post("/", validatorContact, contactController.registerFrom);

module.exports = contactRoute;
