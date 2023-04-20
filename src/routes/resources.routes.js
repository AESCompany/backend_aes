const { Router } = require("express");
const RrsController = require("../controller/Resources.controller");
const { validateResourceUp } = require("../validators/Resources");
const { validateItem } = require("../validators/general");
const isAuth = require("../middleware/sessionAuth");
const checkrol = require("../middleware/roleAuth");

const resourcesRoute = Router();

resourcesRoute.get("/gallery/show", RrsController.showAllItems);
resourcesRoute.get("/gallery/:id", RrsController.resourceById);
resourcesRoute.post(
  "/gallery/upload",
  isAuth,
  checkrol(["superadmin", "admin", "editor"]),
  RrsController.uploadItems
);
resourcesRoute.put(
  "/gallery/:id",
  isAuth,
  checkrol(["superadmin", "admin", "editor"]),
  validateItem,
  validateResourceUp,
  RrsController.updateResourceStatus
);

resourcesRoute.delete(
  "/gallery/:id",
  isAuth,
  checkrol(["superadmin", "admin"]),
  validateItem,
  RrsController.deteleFormResource
);

module.exports = resourcesRoute;
