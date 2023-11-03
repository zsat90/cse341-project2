const router = require("express").Router();
const { requiresAuth } = require("express-openid-connect");

router.use("/people", requiresAuth(), require("./people"));
router.use("/planets", requiresAuth(), require("./planets"));

//swagger route
router.use("/", requiresAuth(), require("./swagger"));

module.exports = router;
