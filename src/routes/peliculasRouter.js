const express = require("express");
const router = express.Router();
const peliculasController = require("../controllers/peliculasController");

// router() es un middleware de nivel de direccionador

router.get("/", peliculasController.getPeliculas);
router.get("/:id", peliculasController.getPeliculaById);
router.post("/", peliculasController.addPelicula);
router.put("/:id", peliculasController.updatePelicula);
router.delete("/:id", peliculasController.deletePelicula);

module.exports = router;
