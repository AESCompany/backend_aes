// Upload
const cloudinary = require("../config/cloudinary");

/**
 * Generador de imagen con cloudinary
 * @param {*} imagePath url
 * @param {*} options {public_id, width, height, Crop}
 * @returns
 */
const uploadImage = async (imagePath, options = {}) => {
  try {
    /* console.log("clou", imagePath); */
    const result = await cloudinary.uploader.upload(imagePath, options);

    return result.url;
  } catch (error) {
    if (error) {
      throw new Error("ERROR_CLOUDINARY: image no se cargo");
    }
  }
};

module.exports = uploadImage;
