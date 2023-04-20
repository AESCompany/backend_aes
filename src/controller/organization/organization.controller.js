const { matchedData } = require("express-validator");
const { person } = require("../../models");
const { organization } = require("../../models");
const handlerHttpError = require("../../utils/handlerHttpError");

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

const createOrganization = async (req, res) => {
  const {
    organizations,
    work,
    email,
    fullname,
    phone,
    post,
    assistants,
    social,
    area,
  } = matchedData(req);
  let newPerson;
  //busco si existe
  let findPerson = await person.findOne({ email: email });

  try {
    //si no encuentra crea
    if (!findPerson) {
      newPerson = new person({
        fullname: fullname,
        email: email,
      });
    }

    let newOrganization = new organization({
      organizations: organizations,
      work: work,
      email: email,
      fullname: fullname,
      phone: phone,
      post: post,
      assistants: assistants,
      social: social,
      area: area,
    });

    //guardo la org para usar el id
    const resultOrg = await newOrganization.save();

    //asigno org al registro person
    findPerson.organization = [...findPerson.organization, resultOrg._id];

    //salvo cambios en person
    await findPerson.save();

    res.status(201).json({ message: "Registro exitoso!" });
  } catch (err) {
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400);
  }
};

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
