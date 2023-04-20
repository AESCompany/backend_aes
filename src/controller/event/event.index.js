const eventController = require("./events.controller");
const { searchEvent, searchBySlug } = require("./searchEvent");
const handlerHttpError = require("../../utils/handlerHttpError");

/**
 *!TODO: funcion de distribucion de funcionalidad
 */
const SearchOrAllBlogs = async (req, res) => {
  const { search } = req.query;
  const { slug } = req.query;
  //busqueda por titulo
  if (search) {
    try {
      const result = await searchEvent(search);
      return res.status(200).send(result);
    } catch (error) {
      handlerHttpError(res, "Este titulo no existe", 400);
    }
  }
  //busqueda por slug
  if (slug) {
    try {
      const result = await searchBySlug(slug);
      return res.status(200).send(result);
    } catch (error) {
      handlerHttpError(res, "Este titulo no existe", 400);
    }
  }

  try {
    const result = await eventController.getAllEvents();

    if (!result.length) {
      return handlerHttpError(res, "No hay Eventos creados !");
    }

    res.status(200).json(result);
  } catch (error) {
    handlerHttpError(res, "ERROR_DIS_EVENT", 500);
  }
};

module.exports = SearchOrAllBlogs;
