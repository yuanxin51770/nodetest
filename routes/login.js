var crypto = require('crypto');
var _utils = require('./utils_func');
var User = require('./users');
// 登录对象
var LoginObj = function(){
    // 登录
    this.LoginIn = function(req, res, callback){
        var username = req.body['username'];
        // md5加密
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('base64');
        var userobj = {
            name: username,
            password:password
        }
        User.get(userobj,function(err, user){
            if(user){
                // 用户名存在
                obj = _utils.setReturnobj(true);
                req.session.user = userobj;
            }
            // 新建
            else{
                obj = _utils.setReturnobj(false, '300', '用户名密码错误！');
            }
            res.send(JSON.stringify(obj));
        });
    };
    // 注销
    this.Loginout = function(req, res, callback){
        req.session.user = null;
        var obj = _utils.setReturnobj(true);
        res.send(JSON.stringify(obj));
    };
    // 注册
    this.register = function(req, res, callback){
        var password = req.body['password'];
        var r_password = req.body['r_password'];
        var username = req.body['username'];
        var nickname = req.body['nickname'];
        // 密码不一致
        if(password != r_password){
            obj = _utils.setReturnobj(false, '300','密码不一致！');
            res.send(JSON.stringify(obj));
            return callback();
        }
        else{
            // md5加密
            var md5 = crypto.createHash('md5');
            var password = md5.update(req.body.password).digest('base64');
            var newUser = new User({
                username:username,
                password:password,
                nickname:nickname
            });
            var userobj = {
                name:username
            }
            User.get(userobj,function(err, user){
                if(user){
                    // 用户名已经存在
                    obj = _utils.setReturnobj(false, '300', '用户名已经存在!');
                }
                // 新建
                else{
                    // 新建
                    newUser.save(function(err){
                        if(err){
                            console.log(err);
                            obj = _utils.setReturnobj(false, '300', '注册错误！');

                        }
                        else{
                            obj = _utils.setReturnobj(true);
                        }
                        res.send(JSON.stringify(obj));
                    });
                }
            });
        }
    }
};
module.exports = LoginObj;