const { event } = require("../../models");

/**
 * !TODO: busqueda de blogs por titulo
 */
const searchEvent = async (search) => {
  const result = await event.find({ title: { $regex: search, $options: "i" } });
  return result;
};

/**
 * !TODO: busqueda por slug debe ser ingresado conforme se genera
 */
const searchBySlug = async (slug) => {
  const result = await event
    .findOne({ slug: slug })
    .populate("categories", "name");

  await result.incrementViewCount();

  return result;
};

module.exports = { searchEvent, searchBySlug };
