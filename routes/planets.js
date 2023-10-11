const router = require("express").Router();
const planetController = require("../controller/planets");

router.get("/", planetController.getAllPlanets);

router.get("/:id", planetController.getPlanetById);

router.post("/", planetController.createNewPlanet);

router.put("/:id", planetController.updatePlanet);

router.delete("/:id", planetController.deletePlanet);

module.exports = router;
