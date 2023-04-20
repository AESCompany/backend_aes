const handlerHttpError = require("../../utils/handlerHttpError");
const { tag } = require("../../models");
const { matchedData } = require("express-validator");

/**
 * !TODO: obtener todas las categorias
 */
const getAllTags = async (req, res) => {
  const result = await tag.find({});
  return result;
};

/**
 * !TODO: crear una nueva categoria
 */
const newTag = async (req, res) => {
  try {
    const { name } = matchedData(req);
    const result = new tag({ name });
    await result.save();

    res.status(200).json(result);
  } catch (error) {
    handlerHttpError(
      res,
      "Categoria no creada, algo inesperado paso o ya existe",
      400
    );
  }
};

/**
 * !TODO: actualizar categoria
 */
const updateTag = async (req, res) => {
  try {
    const { id } = req.params;

    await tag.findByIdAndUpdate({ _id: id }, req.body);

    /* console.log(result) */
    res.status(202).json({ message: "categoria actualizada" });
  } catch (error) {
    handlerHttpError(res, "Error al actualizar o ya existe", 400);
  }
};

/**
 * !TODO: Eliminacion de la categoria
 */
const deleteTag = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;

    const isExist = await tag.findOne({ _id: id });

    if (!isExist) {
      return handlerHttpError(res, "Categoria no encontrada", 404);
    }

    await tag.deleteOne({ _id: id });

    res.status(200).json({
      message: "categoria eliminada",
    });
  } catch (error) {
    handlerHttpError(res, "Algo inesperado sucedio!", 400);
  }
};

module.exports = {
  getAllTags,
  newTag,
  updateTag,
  deleteTag,
};
