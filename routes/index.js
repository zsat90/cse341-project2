const router = require("express").Router();

// Add the routes here with router.use /, require needed file will have one for people and one for planets.

router.use("/people", require("./people"));
router.use("/planets", require("./planets"));

//swagger route
router.use("/", require("./swagger"));

module.exports = router;
