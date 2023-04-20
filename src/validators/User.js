const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

//create
const validatorCreateUser = [
  check("firstname").exists().notEmpty(),
  check("lastname").exists().notEmpty(),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty(),
  check("roles").exists().notEmpty().isMongoId(),
  check("avatar").exists().notEmpty().isString(),
  check("status").optional().isBoolean().default(true),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

//traer todos - eliminar
const validatorGetItems = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

//actualizar si no es admin
const validateUpdate = [
  check("firstname").exists().notEmpty().isString().optional(),
  check("lastname").exists().notEmpty().isString().optional(),
  check("email").exists().isEmail().optional(),
  check("avatar").exists().notEmpty().isString().optional(),
  check("roles").exists().notEmpty().isMongoId().optional(),
  check("status").optional().exists().isBoolean().default(true),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorAuthLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty(),
  check("last_login").optional().isDate(Date.now),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorGetItems,
  validatorCreateUser,
  validateUpdate,
  validatorAuthLogin,
};
