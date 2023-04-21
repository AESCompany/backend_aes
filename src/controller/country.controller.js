const handlerHttpError = require("../utils/handlerHttpError");
const { countries } = require("../models");
const axios = require("axios");

/**
 * !TODO: lista de paises
 * @param {*} req
 * @param {*} res
 */
const getAllCountry = async (req, res) => {
  const { name } = req.query;

  if (name) {
    try {
      const result = await countries.find({
        name: { $regex: new RegExp(`${name}`, "i") },
      });
      res.status(200).json(result);
    } catch (err) {
      handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION_POR_NAME`, 400);
    }
  } else {
    try {
      const result = await countries.find({});
      res.status(200).json(result);
    } catch (err) {
      handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION_TRAER_TODOS`, 400);
    }
  }
};

/**
 * !TODO: llamada de lista de country
 * @param {*} req
 * @param {*} res
 */
const postCountry = async (req, res) => {
  try {
    let getAll = await axios.get(`https://restcountries.com/v3.1/all`);
    const countryNames = getAll.data.map((country) => country.name.common);
    const countryDocs = countryNames.map((name) => ({ name }));
    await countries.insertMany(countryDocs);

    res.status(201).json({ message: `Creado con exito` });
  } catch (err) {
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400);
  }
};

module.exports = { getAllCountry, postCountry };
