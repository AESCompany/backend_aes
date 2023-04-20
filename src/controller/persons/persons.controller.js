const { matchedData } = require("express-validator");
const { person } = require("../../models");
const handlerHttpError = require("../../utils/handlerHttpError");

//listar todos los customers

const getAllPersons = async (req, res) => {
  const { email } = req.query;

  if (email) {
    const emailPerson = await person.find({
      email: { $regex: new RegExp(`${email}`, "i") },
    });
    res.status(200).json(emailPerson);
  } else {
    const allPerson = await person.find({});
    res.send(allPerson);
  }
};

const RegisterPerson = async (req, res) => {
  const { email, fullname, events } = matchedData(req);
  let newPerson;
  const getPerson = await person.findOne({ email: email });

  try {
    if (!getPerson) {
      newPerson = new person({
        email: email,
        fullname: fullname,
        events: [events],
      });

      await newPerson.save();
      return res
        .status(201)
        .json({ message: "Persona, registrado con éxito!!" });
    }

    if (getPerson.events.includes(events)) {
      return handlerHttpError(res, "Ya estas registrado para este evento", 404);
    }

    getPerson.events.push(events);
    await getPerson.save();
    res.status(201).json({ message: "Registro éxitoso!" });
  } catch (error) {
    handlerHttpError(res, "Persona, no pudo registrarse", 404);
  }
};

const deletePersonById = async (req, res) => {
  const idPerson = matchedData(req, { location: ["query"] });
  const { id } = idPerson;

  try {
    const existsPerson = await person.findById(id);
    if (existsPerson) {
      await person.findByIdAndDelete(id);
      res
        .status(200)
        .json({ message: `Persona con el id: ${id}, eliminada con éxito` });
    } else {
      handlerHttpError(
        res,
        `ERROR_ESA_PERSONA_CON_ESE_ID_NO_EXISTE_VERIFICA_DE_NUEVO`,
        404
      );
    }
  } catch (err) {
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400);
  }
};

module.exports = {
  getAllPersons,
  RegisterPerson,
  deletePersonById,
};
