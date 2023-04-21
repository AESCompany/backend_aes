const { role } = require("../models");
const { handlerHttpError } = require("../utils/handlerHttpError");

/**
 * !TODO: obtener la lista de roles
 */
const getAllItems = async (req, res) => {
  try {
    const result = await role.find({});

    res.send(result);
  } catch (error) {
    handlerHttpError(res, "No hay usuarios o hubo un error", 400);
  }
};

module.exports = getAllItems;
