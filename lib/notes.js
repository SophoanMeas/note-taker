const util = require("util");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const __db = path.resolve(__dirname, "../db/db.json");

function fetchNotes(res) {

  readFileAsync(__db, "utf-8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      return res.json(notes);
    })
    .catch((err) => res.status(404).json(err));
}

function addNotes(req, res) {

  const newNote = req.body;

  readFileAsync(__db, "utf-8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      newNote.id = uuidv4();
      notes.push(newNote);
      return notes;
    })
    .then(function (notes) {
      writeFileAsync(__db, JSON.stringify(notes, null, 3));
      return res.json(newNote);
    })
    .catch((err) => res.status(400).json(err));
}

function deleteNotes(req, res) {
    
  const noteId = req.params.id;

  readFileAsync(__db, "utf-8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      const temp = notes.filter((note) => note.id !== noteId);
      return temp;
    })
    .then(function (notes) {
      writeFileAsync(__db, JSON.stringify(notes, null, 3));
      res.send(res.status.OK);
      console.info(`[${req.method}] request received to delete note`);
    })
    .catch((err) => res.status(400).json(err));
}

module.exports = {
  fetchNotes,
  addNotes,
  deleteNotes,
};
