const blogController = require("./blog.controller");
const { searchBlog, searchBySlug } = require("./search.controller");
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
      const result = await searchBlog(search);
      return res.status(200).send(result);
    } catch (error) {
      handlerHttpError(res, "Este titulo no existe", 400);
    }
  }

  //Busqueda por slug
  if (slug) {
    try {
      const result = await searchBySlug(slug);
      return res.status(200).send(result);
    } catch (error) {
      handlerHttpError(res, "Este slug no existe", 400);
    }
  }

  //obtiene la lista de blogs
  try {
    const result = await blogController.getAllBlogs();

    if (!result.length) {
      return handlerHttpError(res, "No hay Blogs creados !");
    }

    res.status(200).json(result);
  } catch (error) {
    handlerHttpError(res, "ERR_LIST_CONTROLLER", 500);
  }
};

module.exports = SearchOrAllBlogs;
