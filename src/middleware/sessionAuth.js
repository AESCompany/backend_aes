const { verifyToken } = require("./generateToken");
const handlerHttpError = require("../utils/handlerHttpError");
const { user } = require("../models");

const isAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handlerHttpError(res, "NO_TIENES_PODER_AQUI", 402);
      return;
    }

    const token = req.headers.authorization.split(" ").pop();

    if (!token) {
      handlerHttpError(res, "Acceso No valido", 401);
      return;
    }

    const verified = await verifyToken(token);

    const foundUser = await user.findOne({ _id: verified.id });

    req.user = foundUser;

    next();
  } catch (error) {
    console.error(error);
    handlerHttpError(res, "ERROR_SESSION_NO_AUTHORIZE", 500);
  }
};

module.exports = isAuth;
