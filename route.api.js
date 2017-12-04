//获得router对象
 var bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');
var errorHandle = require('./common/errorHandle');
var UserModel = require('./models/user');
var config = require('./config');

/* GET users listing. */
router.get('/users', function(req, res, next) {
    res.send('respond with a resource');
  });

/* GET posts lists */
router.get('/posts', function(req, res, next) {
  PostModel.find({}, {}, function(err, posts) {
    if (err) {
      errorHandle(err, next);
    } else {
      res.json({ postsList: posts });
    }
  });
});

/* GET one post */
router.get('/posts/:id', function(req, res, next) {
  var id = req.params.id;

  PostModel.findOne({ _id: id }, function(err, post) {
    if (err) {
      errorHandle(err, next);
    } else {
      res.json({ post });
    }
  });
});

  /* POST posts */
router.post('/posts', function (req, res, next) {
    var title = req.body.title;
    var content = req.body.content;

    var post = new PostModel();
    post.title = title;
    post.content = content;
    post.save(function (err, doc) {
      if(err)
      {
        errorHandle(err, next);
      }
      else{
        res.json({post: doc}); // 注意这里        
      }
    });
    //res.send({title, content}); // 收到数据后，又把数据返回给了请求方
  });
    
/* PATCH edit post */
router.patch('/posts/:id', function(req, res, next) {

  var id = req.params.id;
  var title = req.body.title;
  var content = req.body.content;

  PostModel.findOneAndUpdate({ _id: id }, { title, content }, function(err) {
    if (err) {
      errorHandle(err, next);
    } else {
      res.end();
    }
  });
});
/* POST signup user */
router.post('/signup', function(req, res, next) {
  var name = req.body.name;
  var pass = req.body.pass;
  var rePass = req.body.rePass;

  if (pass !== rePass) {
    return errorHandle(new Error('两次密码不对'), next);
  }

  var user = new UserModel();
  user.name = name;
  user.pass = bcrypt.hashSync(pass, 10);
  user.save(function(err) {
    if (err) {
      errorHandle(err, next);
    } else {
      res.end();
    }
  });
});
/* POST signin user */
router.post('/signin', function(req, res, next) {
  var name = req.body.name || '';
  var pass = req.body.pass || '';

  UserModel.findOne({ name }, function(err, user) {
    if (err || !user) {
      return errorHandle(new Error('找不到用户'),next);
    } else {
      var isOk = bcrypt.compareSync(pass, user.pass);
      if (!isOk) {
        return errorHandle(new Error('密码不对'),next);
      }

      var authToken = user._id;
      var opts = {
        igned: true,
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30, // cookie 有效期30天
        httpOnly: true
      };

      res.cookie(config.cookieName, authToken, opts);
      res.end();
    }
  });
});
  module.exports = router;