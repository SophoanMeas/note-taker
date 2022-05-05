const util = require("util");
const fs = require("fs");
const path = require('path')
const { v4: uuidv4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const __db = path.resolve(__dirname, "../db/db.json");
//  const __db = path.join(OUTPUT, './db/db.json')


// function fetchNotes(notes) {
//   readFileAsync(notes, "utf-8").then(function (data) {
//     notes = [].concat(JSON(data));
//     return res.json(notes);
//   });
// }

// class Notes {

//     fetchNotes() {
//         readFileAsync('./db/db.json', 'utf-8')
//         .then(function(data){
//             const dataNotes = [].concat(JSON.parse(data))
//             return dataNotes
//         })
//     }

function fetchNotes(res) {
    readFileAsync(__db, "utf-8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      return res.json(notes);
    })
    .catch((err) => res.status(404).json(err));
}

function addNotes(req, res){
    
    const notes = req.body;

    readFileAsync(__db, "utf-8")
    .then(function(data){
        const notes = [].concat(JSON.parse(data));
        notes.id = uuidv4();
        notes.push(notes);
        return notes;
    })
    .then(function(notes){
        writeFileAsync(__db, JSON.stringify(notes))
        return res.json(notes)
    })
    .catch((err) => res.status(400).json(err));
}

module.exports = {
  fetchNotes,
  addNotes,
};
