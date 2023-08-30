const apiRouter = require('express').Router();
const fs = require('fs');
const dbNotes = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');



apiRouter.get('/notes', (req, res) => res.json(dbNotes));

apiRouter.post('/notes', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            }
            else {
                let savedNotes = JSON.parse(data);
                savedNotes.push(newNote);
                fs.writeFile(`./db/db.json`, JSON.stringify(savedNotes), (err) => {
                    err ? console.error(err) : console.info(`success!`)
                });
            }
        });
    }
    else {
        console.log("You need a title and some text first!")
    };
});


module.exports = apiRouter;