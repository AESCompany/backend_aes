const { matchedData } = require("express-validator");
const { person } = require("../../models");
const { institution } = require("../../models");
const handlerHttpError = require("../../utils/handlerHttpError");

const getAllInstitution = async (req, res) => {
  const { email } = req.query;

  if (email) {
    try {
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

const createInstitution = async (req, res) => {
  const { organization, email, fullname, phone, post, city, area } =
    matchedData(req);

  console.log(organization, email, fullname, phone, post, city, area);
  try {
    let findPerson = await person.findOne({ email: email });

    if (!findPerson) {
      new person({
        fullname,
        email,
      });
    }

    const newInsti = new institution({
      organization: organization,
      email: email,
      fullname: fullname,
      phone: phone,
      post: post,
      city: city,
      area: area,
    });

    let resultInsti = await newInsti.save();

    findPerson.institution = [...findPerson.institution, resultInsti._id];

    await findPerson.save();

    res.status(201).json({ message: "Registro exitoso!" });
  } catch (err) {
    console.error(err);
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400);
  }
};

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
