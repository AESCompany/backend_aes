const { matchedData } = require("express-validator");
const handlerHttpError = require("../../utils/handlerHttpError");
const { sendPostNewInfo } = require("../suscription/sendEmail");
const { blog } = require("../../models");
const {
  validExtensionImage,
  validExtensionFile,
} = require("../../libs/validExtensionFiles");

/**
 *!TODO: obtener la lista de blogs
 * ?no lleva trycatch por que hay otro punto de control blog.index
 */
const getAllBlogs = async () => {
  const data = await blog
    .find({})
    .populate("categories", "name")
    .populate("tags", "name");
  return data;
};

/**
 * !TODO: crear un blog en nuestro modelo con categoria
 * ?la categoria debe existir y solo recibe id
 */
const setCreateBlog = async (req, res, next) => {
  try {
    const {
      title,
      description,
      status,
      image,
      categories,
      tags,
      short_description,
    } = req.body;

    if (!validExtensionImage(image)) {
      return handlerHttpError(res, "Formato de imagen no válida!", 404);
    }

    let files;
    if (req.body.hasOwnProperty("files") && req.body.files !== null) {
      if (!validExtensionFile(req.body.files)) {
        return handlerHttpError(res, "Solo acepta formato .pdf", 404);
      }
      files = req.body.files;
    }

    const data = new blog({
      title: title,
      image,
      description: description,
      categories,
      short_description: short_description,
      tags,
      status,
      files,
    });

    await data.save();
    await sendPostNewInfo({ type: "blog", info: data });
    res.status(201).json({ message: "Blog creado!" });
  } catch (error) {
    handlerHttpError(res, "Blog no creado, titulo no valido.");
  }
};

/**
 * !TODO: detalle de blog
 */
const getDetailBlog = async (req, res) => {
  try {
    /* req = matchedData(req); */
    const { id } = req.params;

    const result = await blog
      .findOne({ _id: id })
      .populate("categories", "name")
      .populate("tags", "name");

    result.count_view += 1;

    await result.save();

    res.status(200).json(result);
  } catch (error) {
    handlerHttpError(res, "Blog no encontrado!", 404);
  }
};

/**
 * !TODO: actualizar blog
 */
const updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    if (!validExtensionImage(body.image)) {
      return handlerHttpError(res, "Formato de imagen no válida!", 404);
    }

    if (body.files !== null) {
      if (!validExtensionFile(body.files)) {
        return handlerHttpError(res, "Solo acepta formato .pdf", 404);
      }
    }

    await blog.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: body.title,
          image: body.image,
          description: body.description,
          status: body.status,
          categories: body.categories,
          short_description: body.short_description,
          tags: body.tags,
          files: body.files,
        },
      }
    );

    await blog.updateSlug(id);

    res.status(200).json({ message: "blog actualizado!" });
  } catch (error) {
    handlerHttpError(res, `No se pudo actualizar verifica los campos`, 400);
  }
};

/**
 * !TODO: borrado logico
 */
const deleteBlogLogic = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;

    const isExist = await blog.findOne({ _id: id });

    if (!isExist) {
      return handlerHttpError(res, "Blog no existe!", 404);
    }
    const result = await blog.delete({ _id: id });

    res.status(200).json({ message: "Blog eliminado!" });
  } catch (error) {
    handlerHttpError(res, `Error al elimina, intenta luego`, 500);
  }
};

module.exports = {
  getAllBlogs,
  setCreateBlog,
  getDetailBlog,
  updateBlogById,
  deleteBlogLogic,
};
