const { user } = require("../../models");
const { createdToken } = require("../../middleware/generateToken");
const handlerHttpError = require("../../utils/handlerHttpError");
const { matchedData } = require("express-validator");

/**
 * !TODO: login auth
 */
const authLogin = async (req, res) => {
  req = matchedData(req);
  const { email, password } = req;

  try {
    const isExits = await user
      .findOne({ email: email })
      .populate("roles", "name");

    if (!isExits) {
      return handlerHttpError(res, "Usuario o email no coincide", 404);
    }

    const validatePassword = await user.comparePassword(
      password,
      isExits.password
    );

    //401
    if (!validatePassword) {
      return handlerHttpError(res, "La contraseña es erronea", 401);
    }

    const token = createdToken(isExits);

    res.cookie("login", token);
    res.status(202).json({
      success: true,
      token,
      id: isExits._id,
      role: isExits.roles.name,
    });
  } catch (error) {
    handlerHttpError(res, "Datos incorrectos", 400);
  }
};

/**
 * !TODO: Logout auth
 */
const logOut = (req, res) => {
  res.cookie("token", "").json({ success: false });
};

/**
 * !TODO: Cambio de contraseña
 */
const changePassword = async (req, res) => {
  const { id } = req.params;
  const { oldpassword, newpassword } = req.body;

  try {
    const isExist = await user.findOne({ _id: id });

    if (!isExist || isExist.status === false) {
      return handlerHttpError(res, "error con el usuario", 404);
    }

    //valido contraseña
    const validatePassword = await user.comparePassword(
      oldpassword,
      isExist.password
    );

    if (!validatePassword) {
      return handlerHttpError(res, "La contraseña es erronea", 404);
    }

    const validNewPass = await user.comparePassword(
      isExist.password,
      newpassword
    );

    if (validNewPass) {
      return handlerHttpError(
        res,
        "estas seguro que estas cambiando la contraseña?",
        404
      );
    }

    //encryto nueva contraseña
    const encryptNewPass = await user.encryptPassword(newpassword);

    //solo si es distinto lo cambio
    isExist.password = encryptNewPass;

    const data = await isExist.save();
    res.send({ succes: true, message: "Contraseña actualizada!" });
  } catch (error) {
    handlerHttpError(res, "No se pudo realizar la acción", 500);
  }
};

/**
 * !TODO: Cambio de contraseña
 */
const changePasswordSuperAdmin = async (req, res) => {
  const { id } = req.params;
  const { newpassword } = req.body;

  try {
    const isExist = await user.findOne({ _id: id });

    if (!isExist || isExist.status === false) {
      return handlerHttpError(res, "error con el usuario", 404);
    }

    if (!newpassword) {
      return handlerHttpError(res, "estas cambiando la contraseña?", 404);
    }

    //encryto nueva contraseña
    const encryptNewPass = await user.encryptPassword(newpassword);

    //solo si es distinto lo cambio
    isExist.password = encryptNewPass;

    const data = await isExist.save();
    res.send({ succes: true, message: "Contraseña actualizada!" });
  } catch (error) {
    console.error(error);
    handlerHttpError(res, "No se pudo realizar la acción", 500);
  }
};

module.exports = {
  authLogin,
  logOut,
  changePassword,
  changePasswordSuperAdmin,
};
