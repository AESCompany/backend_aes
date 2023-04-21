const { matchedData } = require("express-validator");
const { person } = require("../../models");
const { institution } = require("../../models");
const handlerHttpError = require("../../utils/handlerHttpError");

/**
 * !TODO: listado de todos las intituciones
 * @param {*} req
 * @param {*} res
 */
const getAllInstitution = async (req, res) => {
  const { email } = req.query;

  if (email) {
    try {
      /**
       * !TODO: busqueda por query
       */
      const result = await institution
        .find({
          email: { $regex: new RegExp(`${email}`, "i") },
        })
        .populate("area", "name");
      res.status(200).json(result);
    } catch (err) {
      handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400);
    }
  } else {
    try {
      const result = await institution.find({}).populate("area", "name");
      res.status(200).json(result);
    } catch (err) {
      handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400);
    }
  }
};

/**
 * !TODO: Detalle de la institucion
 * @param {*} req
 * @param {*} res
 */
const getInstitutionById = async (req, res) => {
  const { id } = req.params;

  try {
    const getId = await institution.findById(id).populate("area", "name");
    if (getId) {
      res.status(200).json(getId);
    } else {
      handlerHttpError(res, `ERROR_ESE_ID_NO_EXISTE_VERIFICALO`, 404);
    }
  } catch (err) {
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400);
  }
};

/**
 * !TODO: Formulario de la institucion
 * @param {*} req
 * @param {*} res
 */
const createInstitution = async (req, res) => {
  const { organization, email, fullname, phone, post, city, area } =
    matchedData(req);

  try {
    let findPerson = await person.findOne({ email: email });

    const newInsti = new institution({
      organization: organization,
      email: email,
      fullname: fullname,
      phone: phone,
      post: post,
      city: city,
      area: area,
    });

    await newInsti.save();

    if (!findPerson) {
      let newPerson = new person({
        fullname,
        email,
      });

      newPerson.institution = [...newPerson.institution, newPerson._id];

      await newPerson.save();
      return res.status(201).json({ message: "Usuario registrado!" });
    }

    findPerson.institution = [...findPerson.institution, newInsti._id];

    await findPerson.save();

    res.status(201).json({ message: "ya existes pero agregado!" });
  } catch (err) {
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400);
  }
};

/**
 * !TODO: Actualizar status institucion!
 * @param {*} req
 * @param {*} res
 */
const putInstitutionById = async (req, res) => {
  const { id } = req.params;
  const { view } = matchedData(req);

  try {
    await institution.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          view: view,
        },
      }
    );

    res.status(200).json({ message: `Institucion actualizada` });
  } catch (err) {
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400);
  }
};

module.exports = {
  getAllInstitution,
  getInstitutionById,
  createInstitution,
  putInstitutionById,
};
