const { Router } = require("express");
const personsController = require("../controller/persons/persons.controller");
const validator = require("../validators/Person");
const isAuth = require("../middleware/sessionAuth");
const checkrol = require("../middleware/roleAuth");

const personRoute = Router();

personRoute.get("/", personsController.getAllPersons);

personRoute.post(
  "/",
  validator.RegisterPerson,
  personsController.RegisterPerson
);

personRoute.delete(
  "/:id",
  isAuth,
  checkrol(["superadmin", "admin"]),
  validator.DeletePersonById,
  personsController.deletePersonById
);

module.exports = personRoute;
