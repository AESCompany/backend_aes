const handlerHttpError = require("../utils/handlerHttpError");
const { category } = require("../models");
const { matchedData } = require("express-validator");

const getAllCategory = async (req, res) => {
  try {
    const result = await category.find({});
    if (!result.length) {
      return handlerHttpError(res, "No hay categorias creadas", 404);
    }

    res.status(200).json(result);
  } catch (error) {
    handlerHttpError(res, "ERROR_getItems_category", 500);
  }
};

const newCategory = async (req, res) => {
  const { name } = matchedData(req);

  try {
    const result = new category({ name: name });
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

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await category.findByIdAndUpdate({ _id: id }, req.body);

    res.status(202).json({ message: "categoria actualizada" });
  } catch (error) {
    handlerHttpError(res, "Error al actualizar o ya existe", 400);
  }
};

const deleteCategory = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;

    const isExist = await category.findOne({ _id: id });

    if (!isExist) {
      return handlerHttpError(res, "Categoria no encontrada", 404);
    }

    await category.deleteOne({ _id: id });

    res.status(200).json({
      message: "categoria eliminada",
    });
  } catch (error) {
    handlerHttpError(res, "Algo inesperado sucedio!", 400);
  }
};

module.exports = {
  getAllCategory,
  newCategory,
  updateCategory,
  deleteCategory,
};
