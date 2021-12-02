const express = require("express");
const router = express.Router();
const personajesController = require("../controllers/personajesController");

// router() es un middleware de nivel de direccionador

router.get("/", personajesController.getPersonajes);
router.get("/:id", personajesController.getPersonajeById);
router.post("/", personajesController.addPersonaje);
router.put("/:id", personajesController.updatePersonaje);
router.delete("/:id", personajesController.deletePersonaje);

module.exports = router;
