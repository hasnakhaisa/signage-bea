var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.render('home_test', { title: 'Express' });
});

router.get('/form-text', function(req, res, next) {
    res.render('form-text', { title: 'Express' });
});

router.get('/form-info', function(req, res, next) {
    res.render('form-info', { title: 'Express' });
});

router.get('/form-inbox', function(req, res, next) {
    res.render('form-inbox', { title: 'Express' });
});
router.get('/form-outbox', function(req, res, next) {
    res.render('form-outbox', { title: 'Express' });
});
router.get('/form-photo', function(req, res, next) {
    res.render('form-photo', { title: 'Express' });
});

router.get('/form-video', function(req, res, next) {
    res.render('form-video', { title: 'Express' });
});

router.get('/static', function(req, res, next) {
    res.render('static', { title: 'Express' });
});

module.exports = router;
