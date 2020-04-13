var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;

const Note = require('../models/note.model.js');

/* GET notes listing. */
router.get('/', function (req, res, next) {

    Note.find({})
        .then(notes => {
            res.send(notes);
        }).catch(err => {
        sendError(res, err);
    });
});

router.post('/add', function (req, res, next) {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content,
        status: req.body.status || "new"
    });

    // Save Note in the database
    note.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        sendError(res, err);
    });
});

router.put('/edit', function (req, res, next) {
    Note.findByIdAndUpdate({_id: new ObjectID(req.body._id)}, req.body, {new: true}, function (err, result) {
       err ? res.send(err): res.send(result);
    });
});

// delete note
router.delete('/delete', function (req, res, next) {
    const id = req.query.id;
    if (!id) {
        return res.status(400).send({
            message: "Query id can not be empty."
        });
    }
    Note.findOneAndRemove({_id: id})
        .then(() => {
            res.status(200).send();
        }).catch(err => {
        sendError(res, err);
    });
});

function sendError(res, err) {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the Note."
    });
}

module.exports = router;
