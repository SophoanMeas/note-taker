const router = require("express").Router();
const { fetchNotes, addNotes, deleteNotes } = require("../../lib/notes");

// GET request
router.get("/notes", (req, res) => {
  fetchNotes(res);
});

// POST request
router.post("/notes", (req, res) => {
  addNotes(req, res);
});

// DELETE request
router.delete("/notes/:id", (req, res) => {
  deleteNotes(req, res);
});

module.exports = router;
