var express = require('express');
var router = express.Router();

/* GET Surat Masuk. */
router.get('/gettext', function (req, res) {
    var db = req.db;
    var collection = db.get('text');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

/* EDIT to edittext. */
router.get('/getantext/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('text');
    var textToEdit = req.params.id;
    collection.findOne({'_id': textToEdit}, function (e, docs) {
        res.json(docs);
    });
});
/* EDIT to edittext. */
router.post('/edittext/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('text');
    var textToEdit = req.params.id;
    // console.log("edittext service "+textToEdit+"  "+req.body)

    collection.update({'_id': textToEdit}, req.body, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

module.exports = router;
