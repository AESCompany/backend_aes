const mongoose = require("mongoose");

const DB_CONN = process.env.DB_CONNECTION;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_DATABASE;
const DB_USER = process.env.DB_USERNAME;
const DB_PASS = process.env.DB_PASSWORD;
const DB_URL = process.env.DB_URL;

const url = `${DB_CONN}+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose
  .connect(url || DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(`connected to the database  successfully is time Work! `)
  )
  .catch((error) =>
    console.log(`Error de conexion verifica las credenciales: ${error}`)
  );
