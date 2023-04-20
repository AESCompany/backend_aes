const { Router } = require("express");
const {getAllCountry, postCountry} = require('../controller/country.controller')
const countryRoute = Router();

countryRoute.get("/", getAllCountry);
countryRoute.post('/', postCountry)

module.exports = countryRoute;
