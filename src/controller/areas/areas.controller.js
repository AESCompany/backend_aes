const { matchedData } = require("express-validator");
const { areas } = require("../../models");
const handlerHttpError = require("../../utils/handlerHttpError");

/**
 * !TODO: consulta de todas las áreas creadas!
 * @param {*} req
 * @param {*} res
 */
const getAllAreas = async (req, res) => {
  try {
    const result = await areas.find({});

    if (!result.length) {
      handlerHttpError(res, "No hay áreas creadas!", 404);
    }

    res.status(200).json(result);
  } catch (err) {
    handlerHttpError(res, "Algo inesperado sucedio, contacta a soporte", 500);
  }
};

/**
 * !TODO: Creación de una nueva área
 * @param {*} req
 * @param {*} res
 */
const createNewArea = async (req, res) => {
  const dataArea = matchedData(req, { location: ["body"] });
  const { name } = dataArea;

  try {
    const existsName = await areas.findOne({ name: name });

    if (!existsName) {
      const newArea = new areas({
        name: name,
      });
      await newArea.save();
      res.status(201).json({ message: "área creada con exito!" });
    } else {
      handlerHttpError(res, "Ya existe un área con el mismo nombre", 404);
    }
  } catch (err) {
    handlerHttpError(res, "Algo inesperado sucedio, contacta a soporte", 500);
  }
};

/**
 * !TODO: Eliminar un área existente
 * @param {*} req
 * @param {*} res
 */
const deleteAreaById = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;

    const isExist = await areas.findById({ _id: id });

    if (!isExist) {
      handlerHttpError(res, "${isExist.name} no existe!", 404);
    }

    await areas.findByIdAndDelete({ _id: id });

    res.status(200).json({ message: `${isExist.name} ha sido eliminado.` });
  } catch (err) {
    handlerHttpError(res, "Algo inesperado sucedio, contacta a soporte", 400);
  }
};

module.exports = {
  createNewArea,
  getAllAreas,
  deleteAreaById,
};
