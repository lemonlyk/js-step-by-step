//获得router对象
var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');
var config = require('./config');
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
    post.mkContent = marked(post.content);
    res.render('show', {post});
  });
});
/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

/* GET signin page. */
router.get('/signin', function (req, res, next) {
  res.render('signin');
});
router.get('/signout', function (req, res, next) {
  res.clearCookie(config.cookieName, { path: '/' });
  res.redirect('/');
})
module.exports = router;
