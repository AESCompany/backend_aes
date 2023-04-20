const { tag } = require("../../models");

/**
 * !TODO: Busqueda por name a las tags
 * @param {*} name
 */
const searchTagForName = async (search) => {
  const result = await tag.find({ name: { $regex: search, $options: "i" } });
  return result;
};

module.exports = searchTagForName;
