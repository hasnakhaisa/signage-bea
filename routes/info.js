var express = require('express');
var router = express.Router();

/* GET Surat Masuk. */
router.get('/getinfo', function (req, res) {
    var db = req.db;
    var collection = db.get('info');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

/* EDIT to editinfo. */
router.get('/getaninfo/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('info');
    var infoToEdit = req.params.id;
    collection.findOne({'_id': infoToEdit}, function (e, docs) {
        res.json(docs);
    });
});
/* EDIT to editinfo. */
router.post('/editinfo/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('info');
    var infoToEdit = req.params.id;
    // console.log("editinfo service "+infoToEdit+"  "+req.body)

    collection.update({'_id': infoToEdit}, req.body, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

module.exports = router;
