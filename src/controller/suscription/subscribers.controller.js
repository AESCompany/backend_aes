const handlerHttpError = require("../../utils/handlerHttpError");
const { addSuscriptiontoList } = require("./sendEmail");
const { ContactsApi } = require("../../config/sendinblue");
const { suscription } = require("../../models");
const { person } = require("../../models");

const getAllSusribers = async (req, res) => {
  const suscribers = await suscription.find({});
  res.status(200).json(suscribers);
};

const addSuscription = async (req, res) => {
  const { email } = req.body;

  try {
    let existentPersonInDb = await person.findOne({ email: email });
    let existentSuscription = await suscription.findOne({ email: email });
    if (!existentSuscription) {
      let newSuscription = new suscription({
        email: email,
      });

      await newSuscription.save();

      let newSuscrip = await suscription.findOne({ email: email });
      let newEmail = newSuscrip.email;

      await addSuscriptiontoList({ email: newEmail });

      let existentPerson = await person.findOne({ email: email });

      if (!existentPerson) {
        let newPerson = new person({
          email: email,
          suscriber: true,
        });
        await newPerson.save();
        res.status(200).json({ message: "succesful_create" });
      } else {
        let getPerson = await person.findOne({ email: email });
        getPerson.suscriber = true;
        await getPerson.save();
        return res.status(200).json({ message: "succesful_aggregate" });
      }
    }
    if (existentSuscription && existentSuscription.deleted === true) {
      existentSuscription.deleted = false;
      await existentSuscription.save();

      let existentPerson = await person.findOne({ email: email });
      existentPerson.suscriber = true;
      await existentPerson.save();

      let newSuscrip = await suscription.findOne({ email: email });
      let newEmail = newSuscrip.email;

      await addSuscriptiontoList({ email: newEmail });

      return res.status(200).json({ message: `Succes_User_activate` });
    }
    if (
      existentSuscription &&
      existentSuscription.deleted === false &&
      existentPersonInDb.suscriber === true
    ) {
      return handlerHttpError(res, `USUARIO_YA_ESTA_SUSCRIPTO`, 400);
    }
  } catch (error) {
    handlerHttpError(
      res,
      "No pudo agregarse la suscripcion o el usuario esta registrado",
      400
    );
  }
};

const unsuscribeUser = async (req, res) => {
  const { email } = req.query;

  try {
    if (!email) {
      return handlerHttpError(
        res,
        "Debes ingresar un email a desuscribir",
        404
      );
    }

    let personUnsuscribe = await person.findOne({ email: email });

    if (!personUnsuscribe) {
      return handlerHttpError(
        res,
        "No se encontró una persona con ese correo electrónico",
        404
      );
    }

    personUnsuscribe.suscriber = false;
    await personUnsuscribe.save();

    let deleteSuscriber = await suscription.findOne({ email: email });

    if (deleteSuscriber && deleteSuscriber.deleted === false) {
      await suscription.findOneAndUpdate(
        { email: email },
        {
          $set: {
            deleted: true,
          },
        }
      );

      let apiInstance = ContactsApi;
      await apiInstance.deleteContact(email);
      res.status(200).json({
        message: "El usuario ha sido dado de baja de la suscripción con éxito",
      });
    } else {
      handlerHttpError(res, `ERROR_EL_USUARIO_NO_ESTABA_SUSCRIPTO`, 404);
    }
  } catch (error) {
    handlerHttpError(res, error.message, 400);
  }
};

module.exports = {
  addSuscription,
  getAllSusribers,
  unsuscribeUser,
};
