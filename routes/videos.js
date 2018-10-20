let ObjectID = require('mongodb').ObjectID;
let multer = require('multer');
const fs = require('fs');
const Jimp = require("jimp");
var express = require('express');
var router = express.Router();


router.get('/getvideos/', (req, res, next) => {
    var db = req.db;
    var collection = db.get('videos');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

router.get('/getavideo/:id', (req, res) => {
    var db = req.db;
    var collection = db.get('videos');
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    collection.findOne(details, function (e, docs) {
        res.json(docs);
    });
});

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/videos')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + ".mp4")
    }
});

let upload = multer({storage: storage});

router.post('/uploadvideo', upload.single('video'), (req, res, next) => {
    var db = req.db;
    var collection = db.get('videos');

    let filePath = 'videos/' + req.file.filename;

    let video = {
        video_url: filePath
    };

    collection.insert(video, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});


router.post('/edituploadvideo/:id', upload.single('video'), (req, res, next) => {
    var db = req.db;
    var collection = db.get('videos');
    const id = req.params.id;
    const details = {'_id': id};
    let filePath = 'videos/' + req.file.filename;

    let video = {
        video_url: filePath
    };
    collection.update(details, video, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});

router.get('/deletevideo/:id', (req, res) => {
    var db = req.db;
    var collection = db.get('videos');
    var filePath='';

    const id = req.params.id;
    const details = {'_id': id};

    collection.findOne(details, function (e, docs) {
        filePath = "public/"+docs.video_url;
        fs.unlink(filePath, (err) => {
            if (err) throw err;
            collection.remove(details, function (err, result) {
                res.send(
                    (err === null) ? {msg: ''} : {msg: err}
                );
            });
        });
    });
});

router.post('/removevideo/', (req, res) => {
    var filePath = "public/" + req.body.url;
    fs.unlink(filePath, (err) => {
        if (err) throw err;
    });
});

module.exports = router;