const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

//create
const validatorAddEvent = [
  check("title").exists().notEmpty().isString(),
  check("date_in").notEmpty().isISO8601().toDate(),
  check("date_out").notEmpty().isISO8601().toDate(),
  check("frontpage").exists().notEmpty(),
  check("files").isString().optional(),
  check("short_description").exists().notEmpty().isString(),
  check("location").exists().notEmpty().isString(),
  check("description").exists().notEmpty().isString(),
  check("status").exists().notEmpty().isBoolean(),
  check("categories").exists().notEmpty().isMongoId(),
  check("tags").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorAddEvent,
};
