var express = require('express');
var router = express.Router();

const Note = require('../models/note.model.js');

/* GET notes listing. */
//?user=username
router.get('/', function(req, res, next) {
    if(!req.query.user){
        return res.status(400).send({
            message: "Query user can not be empty. Give username after /: ?user=username"
        });
    }

    Note.find({ createdBy: req.query.user})
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });


});

router.post('/add', function(req, res, next) {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content,
        createdBy: req.body.createdBy
    });

    // Save Note in the database
    note.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
});



module.exports = router;