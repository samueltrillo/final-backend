const mongoose = require("mongoose");

const peliculasSchema = mongoose.Schema(
  {
    idPersonaje: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personajes",
      required: true,
    },
    nombrePelicula: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Peliculas", peliculasSchema);
