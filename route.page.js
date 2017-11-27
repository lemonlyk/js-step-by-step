//获得router对象
var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');
var marked = require('marked');

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

  
/* GET posts edit page. */
router.get('/posts/edit', function(req, res, next) {
  var id=req.query.id;
  res.render('edit',{id});
});

  /* GET posts show page. */
router.get('/posts/show', function (req, res, next) {
  var id = req.query.id;
//console.log("id="+id);
  PostModel.findOne({_id: id}, function (err, post) {
    post.content = marked(post.content);
    res.render('show', {post});
  });
});

module.exports = router;
