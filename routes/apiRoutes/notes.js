const router = require("express").Router();

const { fetchNotes, addNotes, saveNotes, deleteNotes } = require("../../lib/notes");
const Notes = require("../../lib/notes");

// Get request
router.get("/notes", (req, res) => {
    fetchNotes(res);
});

router.post('/notes', (req, res) => {
    addNotes(req, res)
})

module.exports = router;
