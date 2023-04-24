const { matchedData } = require("express-validator");
const { person } = require("../../models");
const { organization } = require("../../models");

const handlerHttpError = require("../../utils/handlerHttpError");

/**
 * !TODO: lista de registros
 * @param {*} req
 * @param {*} res
 */
const getAllOrganizationsForms = async (req, res) => {
  try {
    const { email } = req.query;

    if (email) {
      const result = await organization
        .find({
          email: { $regex: email, $options: "i" },
        })
        .populate("area", "name");
      res.status(200).json(result);
    }
    const result = await organization.find({}).populate("area", "name");
    res.status(200).json(result);
  } catch (err) {
    handlerHttpError(res, `ERROR_OCURRIDO_AL_TRAER_LA_INFORMACION`, 400);
  }
};

/**
 * !TODO: obtener el detalle del registro
 * @param {*} req
 * @param {*} res
 */
const getOrganizationById = async (req, res) => {
  const { id } = req.params;
  req = matchedData(req);

  try {
    const result = await organization.findById(id).populate("area", "name");

    res.status(200).json(result);
  } catch (err) {
    handlerHttpError(res, `El formulario no existe o no es valido!`, 400);
  }
};

/**
 * !TODO: Registro de organizacion!
 * @param {*} req
 * @param {*} res
 * @returns
 */
const createOrganization = async (req, res) => {
  const {
    organizations,
    work,
    email,
    fullname,
    phone,
    post,
    assistants,
    city,
    social,
    view,
    area,
  } = matchedData(req);

  try {
    let isExisPerson = await person.findOne({ email: email });

    let newOrganization = new organization({
      organizations: organizations,
      work: work,
      email: email,
      fullname: fullname,
      phone: phone,
      post: post,
      assistants: assistants,
      city: city,
      social: social,
      view: view,
      area: area,
    });

    await newOrganization.save();

    if (!isExisPerson) {
      let newPerson = new person({
        email: email,
        fullname: fullname,
      });

      newPerson.organization = [...newPerson.organization, newOrganization._id];
      await newPerson.save();
      return res.status(201), json({ message: "Registro con éxito!" });
    }

    isExisPerson.organization = [
      ...isExisPerson.organization,
      newOrganization._id,
    ];
    await isExisPerson.save();
    res.status(201).json({ message: "Registro con éxito!!" });
  } catch (err) {
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400);
  }
};

/**
 * !TODO: actualizar status!
 * @param {*} req
 * @param {*} res
 */
const putOrganizationById = async (req, res) => {
  const { id } = req.params;
  const { view } = matchedData(req);

  try {
    await organization.findByIdAndUpdate(
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
  getAllOrganizationsForms,
  createOrganization,
  getOrganizationById,
  putOrganizationById,
};
