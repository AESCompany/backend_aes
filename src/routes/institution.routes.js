const { Router } = require("express");
const validator = require("../validators/Institucion");
const instController = require("../controller/institution/institution.controller");

const isAuth = require("../middleware/sessionAuth");
const checkrol = require("../middleware/roleAuth");

const institutionRoutes = Router();

institutionRoutes.get("/", instController.getAllInstitution);
institutionRoutes.get(
  "/:id",
  validator.GetById,
  instController.getInstitutionById
);
institutionRoutes.post(
  "/",
  validator.CreateInstitution,
  instController.createInstitution
);
institutionRoutes.put(
  "/:id",
  isAuth,
  checkrol(["superadmin", "admin", "editor"]),
  validator.GetById,
  validator.PutInsti,
  instController.putInstitutionById
);

module.exports = institutionRoutes;
