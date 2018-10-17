var express = require('express');
var router = express.Router();

/* GET Surat Masuk. */
router.get('/getinbox', function(req, res) {
    var db = req.db;
    var collection = db.get('inbox');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});
/* GET Surat Keluar. */
router.get('/getoutbox', function(req, res) {
    var db = req.db;
    var collection = db.get('outbox');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/* POST to tambah surat masuk. */
router.post('/addinbox', function(req, res) {
    var db = req.db;
    var collection = db.get('inbox');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/* POST to tambah surat keluar. */
router.post('/addoutbox', function(req, res) {
    var db = req.db;
    var collection = db.get('getoutbox');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/* DELETE to deleteinbox. */
router.delete('/deleteinbox/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('inbox');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : inboxToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
