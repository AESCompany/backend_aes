const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

const CreateInstitution = [
  check("organization").exists().notEmpty().isString(),
  check("email").exists().notEmpty().isEmail(),
  check("fullname").exists().notEmpty().isString(),
  check("phone").exists().notEmpty().isString(),
  check("post").exists().notEmpty(),
  check("city").exists().notEmpty(),
  check("area").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const GetById = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const PutInsti = [
  check("view").exists().notEmpty().isBoolean(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  CreateInstitution,
  GetById,
  PutInsti,
};
