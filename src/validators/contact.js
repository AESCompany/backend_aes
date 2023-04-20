const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

//create
const validatorContact = [
  check("name").exists().notEmpty().isString(),
  check("email").exists().notEmpty().isEmail(),
  check("phone").exists().notEmpty().isString(),
  check("title").exists().notEmpty().isString(),
  check("content").exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorContact,
};
