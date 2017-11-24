//获得router对象
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

/* GET posts page. */
router.get('/posts', function(req, res, next) {
    //调用posts页，并传递title参数
  res.render('posts', { title: 'Get post page' });
});

/* GET posts edit page. */
router.get('/posts/create', function(req, res, next) {
    res.render('create');
  });

module.exports = router;
