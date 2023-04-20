const { matchedData } = require("express-validator");
const { event } = require("../../models");
const { sendPostNewInfo } = require("../suscription/sendEmail");
const handlerHttpError = require("../../utils/handlerHttpError");

const {
  validExtensionImage,
  validExtensionFile,
} = require("../../libs/validExtensionFiles");
const { clearText } = require("../../libs/validateTextFiltro");
/**
 * !TODO: listar todos los eventos
 */
const getAllEvents = async () => {
  const allEvents = await event
    .find({})
    .populate("categories", "name")
    .populate("tags", "name");
  return allEvents;
};

/**
 * !TODO: agregar un nuevo evento
 */
const createEvent = async (req, res) => {
  try {
    const {
      title,
      frontpage,
      description,
      date_in,
      date_out,
      location,
      status,
      categories,
      short_description,
      tags,
    } = req.body;

    if (!validExtensionImage(frontpage)) {
      return handlerHttpError(res, "Formato de imagen no válida!", 404);
    }
    let files;
    if (req.body.hasOwnProperty("files") && req.body.files !== null) {
      if (!validExtensionFile(req.body.files)) {
        return handlerHttpError(res, "Solo acepta formato .pdf", 404);
      }
      files = req.body.files;
    }

    const data = new event({
      title: title,
      frontpage,
      files,
      description: description,
      date_in,
      date_out,
      short_description: short_description,
      location,
      status,
      categories,
      tags,
    });

    await data.save();
    await sendPostNewInfo({ type: "event", info: data });
    res.status(201).json({ message: "Evento creado con éxito!" });
  } catch (error) {
    handlerHttpError(
      res,
      "Evento no pudo crearse o tiene titulo duplicado",
      404
    );
  }
};

/**
 * !TODO: Obtener el detalle del evento
 */
const detailEventForid = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;

    const isExist = await event.findOne({ _id: id });

    if (!isExist) {
      return handlerHttpError(res, "Evento no existe!", 404);
    }

    const result = await event
      .findById(id)
      .populate("categories", "name")
      .populate("tags", "name");

    res.status(200).json(result);
  } catch (error) {
    handlerHttpError(res, "Este evento no valido");
  }
};

/**
 * !TODO: update evento
 */
const updateEventByid = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    if (!validExtensionImage(body.frontpage)) {
      return handlerHttpError(res, "Formato de imagen no válida!", 404);
    }

    if (body.files) {
      if (!validExtensionFile(body.files)) {
        return handlerHttpError(res, "Solo acepta formato .pdf", 404);
      }
    }

    const data = await event.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: body.title,
          location: body.location,
          frontpage: body.frontpage,
          files: body.files,
          description: body.description,
          status: body.status,
          date_in: body.date_in,
          short_description: body.short_description,
          date_out: body.date_out,
          categories: body.categories,
          tags: body.tags,
        },
      }
    );
    res.status(200).json({ message: "Evento actualizado" });
  } catch (error) {
    handlerHttpError(res, "Verifica los campos requeridos", 404);
  }
};

const deleteEventByid = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;

    const isExist = await event.findOne({ _id: id });

    if (!isExist) {
      return handlerHttpError(res, "Evento no encontrado!", 404);
    }

    const result = await event.delete({ _id: id });
    res.status(200).json({ message: "Evento eliminado!" });
  } catch (error) {
    handlerHttpError(res, "Error al eliminar, intenta despues");
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  detailEventForid,
  updateEventByid,
  deleteEventByid,
};
