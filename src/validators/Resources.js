const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

const validateResourceCreate = [
  check("origin")
    .isIn(["videos", "images", "slider, logos"])
    .notEmpty()
    .exists(),
  check("url").notEmpty().isString(),
  check("title")
    .optional()
    .isString()
    .exists()
    .isLength({ max: 40 })
    .notEmpty(),
  check("subtitle")
    .optional()
    .isString()
    .exists()
    .isLength({ min: 20, max: 120 })
    .notEmpty(),
  check("status").isBoolean().default(false).optional(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validateResourceUp = [
  check("url").notEmpty().isString(),
  check("title")
    .optional()
    .isString()
    .exists()
    .isLength({ max: 40 })
    .notEmpty(),
  check("subtitle")
    .optional()
    .isString()
    .exists()
    .isLength({ min: 20, max: 120 })
    .notEmpty(),
  check("status").isBoolean().default(false),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validateResourceCreate, validateResourceUp };
