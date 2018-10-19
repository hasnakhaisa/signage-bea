let ObjectID = require('mongodb').ObjectID;
let multer = require('multer');
const fs = require('fs');
const Jimp = require("jimp");
var express = require('express');
var router = express.Router();

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/slider')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + ".jpg")
    }
});

let upload = multer({storage: storage});


router.get('/getphotos/', (req, res, next) => {
    db.collection('photos').find({}).toArray((err, items) => {
        console.log(items);
        res.send(items);
    })
});

router.get('/getaphoto/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('photos').findOne(details, (err, item) => {
        if (err)
            res.send({'error': 'An error has occured'});
        else
            res.send(item);
    })
});

router.post('/uploadphoto', upload.single('image'), (req, res, next) => {
    let filePath = 'images/slider/' + req.file.filename;

    let photo = {
        name: req.file.filename,
        caption: req.body.caption,
        photo_url: filePath,
    };

    console.log("photo bos : " + photo);

    db.collection('photos')
        .insertOne(photo, (err, result) => {
            if (err) {
                console.log({'error': 'An error has occurred'});
            }
            else {
                console.log(result.ops[0]);
                Jimp.read(filePath, function (err, image) {
                    if (err) throw err;
                    startTime = Date.now();
                    image
                        .resize(640, 480)
                    //setengah teratas
                    ;
                });
            }
        });
});
router.delete('/deletephoto/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('photos').removeOne(details, (err, item) => {
        if (err) {
            res.send({'error': 'An error has occurred'});
        }
        res.send('photo ' + id + ' deleted!');
    })
});

router.put('/editphoto/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('photos').updateOne(details, req.body, (err, results) => {
        if (err)
            res.send({'error': 'an error has occured'});
        else
            res.send(req.body);
    })
});

module.exports = router;