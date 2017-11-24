//获得router对象
var express = require('express');
var router = express.Router();

/* GET posts page. */
router.get('/', function(req, res, next) {
    //调用posts页，并传递title参数
  res.render('posts', { title: 'Get post page' });
});

/* GET 获取postsList数据 */
router.get('/list', function(req, res, next) {
    res.json({postsList: ['文章1', '文章2', '文章3'] });
  });

module.exports = router;
