const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

//traer todos - eliminar - actualizar - detalle
const validateItem = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const valideteNameItem = [
  check("name").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validateItem,
  valideteNameItem,
};
