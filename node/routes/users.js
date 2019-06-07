var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
    if(!req.body.username) {
        return res.status(400).send({
            message: "Username can not be empty"
        });
    }
    return res.status(200).send({
        message: "Login successfully!"
    });
});


module.exports = router;
