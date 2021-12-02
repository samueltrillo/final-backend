const models = require("../models");

const getPersonajes = async (req, res) => {
  try {
    const response = await models.Personajes.find();

    return res.status(200).json({
      data: response,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
      error: true,
    });
  }
};

const getPersonajeById = async (req, res) => {
  try {
    const personajeId = req.params.id;
    const response = await models.Personajes.findById(personajeId);

    if (response) {
      res.status(200).json({
        data: response,
        error: false,
      });
    } else {
      res.status(404).json({
        msg: "El personaje no existe",
        error: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error,
      error: true,
    });
  }
};

const addPersonaje = async (req, res) => {
  try {
    const personaje = new models.Personajes(req.body);
    await personaje.save();
    res.status(200).json({
      data: personaje,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
      error: true,
    });
  }
};

const updatePersonaje = async (req, res) => {
  try {
    const personajeId = req.params.id;

    if (!Object.keys(req.body).length) {
      return res.status(404).json({
        error: true,
        msg: "Por favor, inserte los datos necesarios",
      });
    }

    const personaje = await models.Personajes.findByIdAndUpdate(
      personajeId,
      req.body,
      // el new: true, retorna el objeto ya actualizado, y no el objeto antes de actualizar
      { new: true }
    );

    if (personaje) {
      res.status(200).json({
        error: false,
        data: personaje,
      });
    } else {
      res.status(404).json({
        error: true,
        msg: "El personaje no existe",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: error,
    });
  }
};

const deletePersonaje = async (req, res) => {
  try {
    const personajeId = req.params.id;

    const personajeResponse = await models.Personajes.findByIdAndRemove(
      personajeId
    );

    if (personajeResponse) {
      const peliculaResponse = await models.Peliculas.deleteMany({
        idPersonaje: personajeId,
      });

      res.status(200).json({
        error: false,
        data: {
          personaje: personajeResponse,
          pelculas: peliculaResponse,
        },
        msg: `El personaje con id ${personajeId} fue eliminada exitosamente ${
          peliculaResponse ? "y las peliculas asociadas tambien" : ""
        }`,
      });
    } else {
      res.status(404).json({
        error: true,
        msg: "El personaje no existe",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: error,
    });
  }
};

module.exports = {
  getPersonajes,
  getPersonajeById,
  addPersonaje,
  updatePersonaje,
  deletePersonaje,
};
