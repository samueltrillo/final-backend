const express = require("express");
const personajesRouter = require("./personajesRoutes");
const peliculasRouter = require("./peliculasRouter");

const router = express.Router();

router.use("/personajes", personajesRouter);
router.use("/peliculas", peliculasRouter);

module.exports = router;
