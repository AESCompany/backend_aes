const { validationResult } = require("express-validator");

/**
 * !TODO: esta funcion es un middleware parra las validaciones de los modelos
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    res.status(403);
    res.send({ errors: error.array() });
  }
};

module.exports = validateResults;
