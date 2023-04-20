"user strict";

const jwt = require("jsonwebtoken");

/**
 * pasar el objeto del usuario creado
 * @param {*} user
 * @returns  token
 */
const createdToken = (user) => {
  const token = jwt.sign(
    { id: user._id, role: user.roles },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "2d",
    }
  );
  return token;
};

/**
 * pasa el token de sesion
 * @param {*} tokenasign
 * @returns tokenverificado
 */
const verifyToken = async (tokenasign) => {
  try {
    return jwt.verify(tokenasign, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

const decodeSign = (token) => {
  return jwt.decode(token, null);
};
module.exports = { createdToken, verifyToken, decodeSign };
