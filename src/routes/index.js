const { Router } = require("express");
const fs = require("fs");

const routes = Router();

/**
 * !TODO: Esta ruta es dinamica no se necesita agregar ninguna ruta adicional que sean rutas claras y especificas
 */
const PATH_ROUTES = __dirname;
const removeExtends = (filename) => {
  //user.routes.js
  return filename.split(".").shift();
};

fs.readdirSync(PATH_ROUTES).filter((file) => {
  const fileClean = removeExtends(file);
  if (fileClean !== "index") {
    routes.use(`/${fileClean}`, require(`./${file}`));
  } else {
    routes.use("/notfound", (req, res) => {
      res.status(404).json({ message: "Algo inesperado sucedio :') !" });
    });
  }
});

module.exports = routes;
