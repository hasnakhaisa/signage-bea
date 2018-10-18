var express = require('express');
var router = express.Router();

/* GET Surat Masuk. */
router.get('/getinbox', function (req, res) {
    var db = req.db;
    var collection = db.get('inbox');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});
/* GET Surat Keluar. */
router.get('/getoutbox', function (req, res) {
    var db = req.db;
    var collection = db.get('outbox');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

/* POST to tambah surat masuk. */
router.post('/addinbox', function (req, res) {
    var db = req.db;
    var collection = db.get('inbox');
    collection.insert(req.body, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

/* POST to tambah surat keluar. */
router.post('/addoutbox', function (req, res) {
    var db = req.db;
    var collection = db.get('outbox');
    collection.insert(req.body, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

/* DELETE to deleteinbox. */
router.delete('/deleteinbox/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('inbox');
    var inboxToDelete = req.params.id;
    collection.remove({'_id': inboxToDelete}, function (err) {
        res.send((err === null) ? {msg: ''} : {msg: 'error: ' + err});
    });
});
/* EDIT to editinbox. */
router.get('/getaninbox/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('inbox');
    var inboxToEdit = req.params.id;
    collection.findOne({'_id': inboxToEdit}, function (e, docs) {
        res.json(docs);
    });
});
/* EDIT to editinbox. */
router.post('/editinbox/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('inbox');
    var inboxToEdit = req.params.id;
    // console.log("editinbox service "+inboxToEdit+"  "+req.body)

    collection.update({'_id': inboxToEdit}, req.body, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

module.exports = router;
