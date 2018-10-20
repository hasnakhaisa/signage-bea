var express = require('express');
var router = express.Router();

/* GET Surat Masuk. */
router.get('/getoutbox', function (req, res) {
    var db = req.db;
    var collection = db.get('outbox');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

/* POST to tambah surat masuk. */
router.post('/addoutbox', function (req, res) {
    var db = req.db;
    var collection = db.get('outbox');
    collection.insert(req.body, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

/* EDIT to editoutbox. */
router.get('/getanoutbox/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('outbox');
    var outboxToEdit = req.params.id;
    collection.findOne({'_id': outboxToEdit}, function (e, docs) {
        res.json(docs);
    });
});
/* EDIT to editoutbox. */
router.post('/editoutbox/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('outbox');
    var outboxToEdit = req.params.id;
    collection.update({'_id': outboxToEdit}, req.body, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});


/* DELETE to deleteoutbox. */
router.delete('/deleteoutbox/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('outbox');
    var outboxToDelete = req.params.id;
    collection.remove({'_id': outboxToDelete}, function (err) {
        res.send((err === null) ? {msg: ''} : {msg: 'error: ' + err});
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


module.exports = router;
