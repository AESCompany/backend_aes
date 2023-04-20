const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

//create Person
const RegisterPerson = [
  check("email").exists().notEmpty().isEmail(),
  check("fullname").optional().exists().notEmpty(),
  check("events").optional().exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const DeletePersonById = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  RegisterPerson,
  DeletePersonById,
};
