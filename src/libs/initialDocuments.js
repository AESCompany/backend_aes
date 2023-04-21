const { role } = require("../models");
const { category } = require("../models");
const { tag } = require("../models");
const { areas } = require("../models");
const { user } = require("../models");
/**
 *!TODO: creacion de roles base
 */
const createRoles = async () => {
  try {
    const count = await role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new role({ name: "superadmin" }).save(),
      new role({ name: "admin" }).save(),
      new role({ name: "editor" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

/**
 *!TODO: creacion de categorias base
 */
const createCategories = async () => {
  try {
    const count = await category.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new category({ name: "videos" }).save(),
      new category({ name: "testimonios" }).save(),
      new category({ name: "salud" }).save(),
      new category({ name: "educación" }).save(),
      new category({ name: "eventos" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

/**
 *!TODO: creacion de categorias base
 */
const createTags = async () => {
  try {
    const count = await tag.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new tag({ name: "causas" }).save(),
      new tag({ name: "salud" }).save(),
      new tag({ name: "niños" }).save(),
      new tag({ name: "educación" }).save(),
      new tag({ name: "noticias" }).save(),
      new tag({ name: "eventos" }).save(),
      new tag({ name: "instituciones" }).save(),
      new tag({ name: "patrocinadores" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

/**
 *!TODO: creacion de categorias base
 */

const createAreas = async () => {
  try {
    const count = await areas.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new areas({ name: "Salud Mental" }).save(),
      new areas({ name: "Salud Física" }).save(),
      new areas({ name: "Salud Social" }).save(),
      new areas({ name: "Salud Ambiental" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

const createSuperAdmin = async () => {
  try {
    const count = await user.estimatedDocumentCount();
    const findRol = await role.findOne({ name: "superadmin" });
    if (count > 0) return;
    const values = new user({
      firstname: "Super",
      lastname: "usuario",
      email: process.env.SUPER_ADMIN_EMAIL,
      password: await user.encryptPassword(process.env.SUPER_ADMIN_PASS),
      avatar: `https://res.cloudinary.com/dpisdt9i3/image/upload/v1681955070/icon-128x128_wphlbq.png`,
      roles: findRol._id,
    });

    await values.save();
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createRoles,
  createCategories,
  createTags,
  createAreas,
  createSuperAdmin,
};
