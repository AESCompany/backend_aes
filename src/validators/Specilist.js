const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

//create formulario especialista
const validatorRegisterSpecialist = [
  check("fullname").exists().notEmpty().isString(),
  check("email").exists().notEmpty().isEmail().isEmail(),
  check("phone").exists().notEmpty().isString(),
  check("area").exists().notEmpty().isMongoId(),
  check("country").exists().notEmpty().isString(),
  check("filepath").exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetItems = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validateUpdate = [
  check("view").exists().notEmpty().isBoolean(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorRegisterSpecialist,
  validatorGetItems,
  validateUpdate,
};
