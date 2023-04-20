const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

//validator create Area
const validatorCreateArea = [
  check("name").exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorDeleteAreaById = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorCreateArea,
  validatorDeleteAreaById,
};
