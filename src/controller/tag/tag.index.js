const tagController = require("./tag.controller");
const searchTagForName = require("./search.controller");
const handlerHttpError = require("../../utils/handlerHttpError");

/**
 * !TODO: obtener todas las categorias
 */
const SearchOrAllTags = async (req, res) => {
  const { search } = req.query;
  if (search) {
    try {
      const result = await searchTagForName(search);
      return res.status(200).send(result);
    } catch (error) {
      handlerHttpError(res, "Tag no existe", 404);
    }
  }

  try {
    const result = await tagController.getAllTags();

    if (!result.length) {
      return handlerHttpError(res, "No hay tags creados!");
    }

    res.status(200).send(result);
  } catch (error) {
    handlerHttpError(res, "ERR_LIST_TAGS", 500);
  }
};

module.exports = SearchOrAllTags;
