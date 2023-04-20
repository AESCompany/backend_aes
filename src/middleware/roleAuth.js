const handlerHttpError = require("../utils/handlerHttpError");
const { verifyToken } = require("../middleware/generateToken");

const checkrol = (roles) => async (req, res, next) => {
  try {
    const { user } = req;

    const helper = await user.populate("roles", "name");
    const rolesByUser = helper.roles.name;

    const checkValueRol = roles.some((rol) => rolesByUser.includes(rol));

    if (!checkValueRol) {
      return handlerHttpError(res, "Usuario no tiene permisos", 403);
    }
    next();
  } catch (error) {
    console.error(error);
    handlerHttpError(res, "No tienes un rol valido", 403);
  }
};

module.exports = checkrol;
