require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();
const MONGO_URI = process.env.MONGO_URI;
const router = require("./src/routes/index");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(router);

// ANTE CUALQUIER PROBLEMA AL CONECTAR A LA BASE DE DATOS, REVISAR
// 1.- Que la URI tenga correctamente setedo el nombre, la contraseña y la base de datos a la que le pega
// 2.- Verificar que ese usuario y contraseña este añadido en DATABASE ACCESS
// 3.- Verificar de que esté permitida la IP del usuario (si no, setear de que cualquier IP pueda conectarse)

// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log("Conectado a la base de datos");

//     app.listen({ port: PORT }, () => {
//       console.log(`Servidor corriendo en el puerto ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(`Error: ${error}`);
//     console.log("No fue posible conectarse a la base de datos");
//   });

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado a la base de datos");

    app.listen({ port: PORT }, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    console.log("No fue posible conectarse a la base de datos");
  }
};

connectDb();
