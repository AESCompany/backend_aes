const { Router } = require("express");
const {
  validatorCreateArea,
  validatorDeleteAreaById,
} = require("../validators/Areas");
const {
  createNewArea,
  getAllAreas,
  deleteAreaById,
} = require("../controller/areas/areas.controller");

const isAuth = require("../middleware/sessionAuth");
const checkrol = require("../middleware/roleAuth");

const areasRouter = Router();

areasRouter.get("/", getAllAreas);
areasRouter.post(
  "/",
  isAuth,
  checkrol(["superadmin", "admin", "editor"]),
  validatorCreateArea,
  createNewArea
);
areasRouter.delete(
  "/:id",
  isAuth,
  checkrol(["superadmin", "admin"]),
  validatorDeleteAreaById,
  deleteAreaById
);

module.exports = areasRouter;
