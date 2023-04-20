const { matchedData } = require("express-validator");
const { permission } = require("../models");
const { handlerHttpError } = require("../utils/handlerHttpError");

/**
 * !TODO: obtener la lista de permisos
 */
const getAllItems = async (req, res) => {
  try {
    const data = await permission.find({});

    if (!data.length) {
      return handlerHttpError(res, "No hay permisos creados", 501);
    }

    res.status(200).json(data);
  } catch (error) {
    handlerHttpError(res, "ERROR al asignar permisos", 400);
  }
};

module.exports = getAllItems;
