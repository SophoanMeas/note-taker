const router = require("express").Router();
const notes = require("../apiRoutes/notes_route");

router.use(notes);

module.exports = router;
