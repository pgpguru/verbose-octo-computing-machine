const express = require('express');
const router = require('express').Router();
const { readAndAppend, writeToFile, readFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require("fs");

// This is the GET Route. This will help retrieve the data that is saved in the db.json
router.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// POST Route for submitting notes in the db.json
// IT will take a data entry and deconstruct it into two aspects: title and text
router.post('/', (req, res) => {
    const { title, text, } = req.body;

    // This if statement checks to see if any value for title or text and if there is
    // a new note is created based on the title and text input in the db.json
    // and a random id is given
    // the three different values will be the notes title, the notes content, and a randomly
    // generated id that will be used to identify the note.

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        // This calls upon the function in the fsUtil.js to append and write the 
        // data into the db.json
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };
        res.json(response);

    // Else nothing is done
    } else {
        res.json('Error in posting feedback');
    }
});

// This will delete any note saved based on the randomly generated ID given when the note was created.
router.delete('/:id', (req, res) => {
    const {id} = req.params
    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    const noteIndex = notes.findIndex((note) => note.id === id);
    notes.splice(noteIndex, 1);
    writeToFile("./db/db.json", notes);
  
    return res.send();
  });

module.exports = router;