const multer = require("multer");
const fs = require("fs");
const path = require("path");

/**
 * !TODO: Funcion servira como middleware en caso tenga que subir un archivo al servidor.
 * ? validar subida con es3 - aws
 */

//verifico si existe la carpeta para crearlo
let storageCreated = false;
const storagePath = `${__dirname}/../public`;

if (!storageCreated && !fs.existsSync(storagePath)) {
  try {
    fs.mkdirSync(storagePath, { recursive: true });
    console.log("La carpeta se creó exitosamente.");
    storageCreated = true;
  } catch (err) {
    console.error("Error al crear la carpeta:", err);
  }
} else {
  console.log("La carpeta ya se ha creado anteriormente 🙂 .");
}

//dirname me da la posicion en la carpeta actual
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathPublic = `${__dirname}/../public`;
    cb(null, pathPublic);
  },
  filename: function (req, file, cb) {
    const nameFile = file.originalname.split(".").shift();

    const ext = file.originalname.split(".").pop();
    const filename = `${nameFile}-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
