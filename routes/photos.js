let ObjectID = require('mongodb').ObjectID;
let multer = require('multer');
const fs = require('fs');
const Jimp = require("jimp");
var express = require('express');
var router = express.Router();


router.get('/getphotos/', (req, res, next) => {
    var db = req.db;
    var collection = db.get('photos');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

router.get('/getaphoto/:id', (req, res) => {
    var db = req.db;
    var collection = db.get('photos');
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    collection.findOne(details, function (e, docs) {
        res.json(docs);
    });
});

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/slider')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + ".jpg")
    }
});

let upload = multer({storage: storage});

router.post('/uploadphoto', upload.single('image'), (req, res, next) => {
    var db = req.db;
    var collection = db.get('photos');

    let filePath = 'images/slider/' + req.file.filename;

    let photo = {
        caption: req.body.caption,
        photo_url: filePath
    };

    collection.insert(photo, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

router.post('/editphoto/:id', (req, res) => {
    var db = req.db;
    var collection = db.get('photos');
    const id = req.params.id;
    const details = {'_id': id};

    let photo = {
        caption: req.body.caption,
    };
    collection.update(details, photo, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

router.post('/edituploadphoto/:id', upload.single('image'), (req, res, next) => {
    var db = req.db;
    var collection = db.get('photos');
    const id = req.params.id;
    const details = {'_id': id};
    let filePath = 'images/slider/' + req.file.filename;

    let photo = {
        caption: req.body.caption,
        photo_url: filePath
    };
    collection.update(details, photo, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

router.delete('/deletephoto/:id', (req, res) => {
    var db = req.db;
    var collection = db.get('photos');
    console.log(req);

    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};

    collection.remove(details, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

module.exports = router;