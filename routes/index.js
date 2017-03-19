var express = require('express');
var Login = require('./login');
var Blog = require('./blog');
var router = express.Router();
var loginobj = new Login();
var blogobj = new Blog();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',friends:11 });
});
// 注册页面
router.post('/register', function(req, res, next) {
    loginobj.register(req, res);
});
// 登录页面
router.post('/login', function(req, res, next) {
    loginobj.LoginIn(req, res);
});
// 注销页面
router.get('/loginout', function(req, res, next) {
    loginobj.Loginout(req, res);
});
// 微博发送
router.post('/blogsend', function(req, res, next) {
    blogobj.send(req, res);
});
// 微博获取
router.get('/blogget', function(req, res, next) {
    blogobj.get(req, res);
});
module.exports = router;
