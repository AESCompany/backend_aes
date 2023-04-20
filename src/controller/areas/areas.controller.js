const { matchedData } = require("express-validator");
const { area } = require("../../models");
const handlerHttpError = require("../../utils/handlerHttpError");

const getAllAreas = async (req, res) => {
  try {
    const result = await area.find({});

    if (!result.length) {
      handlerHttpError(res, "No hay áreas creadas !", 404);
    }

    res.status(200).json(result);
  } catch (err) {
    handlerHttpError(res, "Error en la petición, contacta soporte", 500);
  }
};

const createNewArea = async (req, res) => {
  const dataArea = matchedData(req, { location: ["body"] });
  const { name } = dataArea;

  try {
    const existsName = await area.findOne({ name: name });

    if (!existsName) {
      const newArea = new area({
        name: name,
      });
      await newArea.save();
      res.status(201).json(newArea);
    } else {
      handlerHttpError(
        res,
        `ERROR_ESE_AREA_CON_ESE_NAME_YA_EXISTE_VALIDA_OTRO_NOMBRE`,
        400
      );
    }
  } catch (err) {
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400);
  }
};

const deleteAreaById = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;

    const isExist = await area.findById({ _id: id });

    if (!isExist) {
      handlerHttpError(res, `${isExist.name} no existe!`, 404);
    }

    const result = await area.findByIdAndDelete({ _id: id });

    res.status(200).json({ message: `${isExist.name} ha sido eliminado.` });
  } catch (err) {
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400);
  }
};

module.exports = {
  createNewArea,
  getAllAreas,
  deleteAreaById,
};
