const router = require("express").Router();
const peopleController = require("../controller/people");

router.get("/", peopleController.getAllPeople);

router.get("/:id", peopleController.getPersonById);

router.post("/", peopleController.createNewPerson);

router.put("/:id", peopleController.updatePerson);

router.delete("/:id", peopleController.deletePerson);

module.exports = router;
