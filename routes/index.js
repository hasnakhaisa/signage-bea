var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});
router.get('/form-surat', function(req, res, next) {
    res.render('form-surat', { title: 'Express' });
});

router.get('/form-inbox', function(req, res, next) {
    res.render('form-inbox', { title: 'Express' });
});

router.get('/form-text', function(req, res, next) {
    res.render('form-text', { title: 'Express' });
});

module.exports = router;