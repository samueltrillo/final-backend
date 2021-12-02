const models = require("../models");

const getPeliculas = async (req, res) => {
  try {
    const response = await models.Peliculas.find();

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

const getPeliculaById = async (req, res) => {
  try {
    const peliculaId = req.params.id;
    const response = await models.Peliculas.findById(peliculaId);

    if (response) {
      res.status(200).json({
        data: response,
        error: false,
      });
    } else {
      res.status(404).json({
        msg: "La película no existe",
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

const addPelicula = async (req, res) => {
  try {
    if (!req.body.nombrePelicula) {
      return res.status(400).json({
        error: true,
        msg: "El campo nombre es requerido. Por favor, ingrese el nombre de la pelicula",
      });
    }

    const pelicula = new models.Peliculas(req.body);
    await pelicula.save();
    res.status(200).json({
      data: pelicula,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
      error: true,
    });
  }
};

const updatePelicula = async (req, res) => {
  try {
    const peliculaId = req.params.id;

    const pelicula = await models.Peliculas.findByIdAndUpdate(
      peliculaId,
      req.body,
      // el new: true, retorna el objeto ya actualizado, y no el objeto antes de actualizar
      { new: true }
    );

    if (pelicula) {
      res.status(200).json({
        error: false,
        data: pelicula,
      });
    } else {
      res.status(404).json({
        error: true,
        msg: "La pelicula no existe",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: error,
    });
  }
};

const deletePelicula = async (req, res) => {
  try {
    const peliculaId = req.params.id;

    const response = await models.Peliculas.findByIdAndRemove(peliculaId);

    if (response) {
      res.status(200).json({
        error: false,
        data: response,
        msg: `La pelicula con id ${peliculaId} fue eliminada exitosamente`,
      });
    } else {
      res.status(404).json({
        error: true,
        msg: "La pelicula no existe",
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
  getPeliculas,
  getPeliculaById,
  addPelicula,
  updatePelicula,
  deletePelicula,
};
