const handlerHttpError = require("../utils/handlerHttpError");
const { contact } = require("../models");
const { clearText } = require("../libs/validateTextFiltro");
const showMessage = async (req, res) => {
  try {
    const data = await contact.find({});
    if (!data.length) {
      return handlerHttpError(res, "No tiene mensajes aún!", 404);
    }
    res.status(200).json(data);
  } catch (error) {
    handlerHttpError(res, "Algo inesperado ha pasado", 404);
  }
};

const getContactbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await contact.findOne({ _id: id });

    res.status(200).json(result);
  } catch (error) {
    handlerHttpError(res, "Error, id no valido o no existe.", 500);
  }
};
const registerFrom = async (req, res) => {
  try {
    const { name, email, phone, title, content } = req.body;

    const data = new contact({
      name,
      email,
      phone,
      title: clearText(title),
      content: clearText(content),
    });

    await data.save();
    res.status(201).json({ message: "mensaje recibido!" });
  } catch (error) {
    handlerHttpError(res, "Algo inesperado ha pasado", 404);
  }
};

module.exports = {
  showMessage,
  registerFrom,
  getContactbyId,
};
