const { Router } = require("express");
const validator = require("../validators/Organization");
const OrgController = require("../controller/organization/organization.controller");

const isAuth = require("../middleware/sessionAuth");
const checkrol = require("../middleware/roleAuth");

const organizationRoutes = Router();

organizationRoutes.get(
  "/",
  isAuth,
  checkrol(["superadmin", "admin", "editor"]),
  OrgController.getAllOrganizationsForms
);
organizationRoutes.post(
  "/",
  validator.CreateOrganization,
  OrgController.createOrganization
);
organizationRoutes.get(
  "/:id",
  validator.OrgById,
  OrgController.getOrganizationById
);
organizationRoutes.put(
  "/:id",
  isAuth,
  checkrol(["superadmin", "admin", "editor"]),
  validator.OrgById,
  validator.UpdateOrg,
  OrgController.putOrganizationById
);

module.exports = organizationRoutes;
