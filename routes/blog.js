var _utils = require('./utils_func');
var mongodb = require('./db');
// 微博内容
var blog = function(obj){
    /*this.username = obj.username;
    this.content = obj.content;
    this.title = obj.title;
    this.time = obj.time;
    this.blogObj = obj;*/
};
module.exports = blog;
blog.prototype.send = function(req, res){
    // session中的用户信息
    var user = req.session.user;
    if(!user){
        var obj = _utils.setReturnobj(false, '301', '请先登录！');
        res.send(JSON.stringify(obj));
    }
    var blogObj = {};
    blogObj.content = encodeURI(req.body.content);
    blogObj.title = encodeURI('标题');
    blogObj.username = encodeURI(user.name);
    blogObj.time = new Date();
    // 数据库连接方法
    _utils.dbcollect('blog',function(collection){
        collection.insert(blogObj, function(err, doc){
            mongodb.close();
            if(err){
                console.log(err);
                var obj = _utils.setReturnobj(false, '300', '发送错误！');
            }
            else{
                var obj = _utils.setReturnobj(true);
            }
            res.send(JSON.stringify(obj));
        });
    });
};
// 获取博客内容
blog.prototype.get = function(req, res){
    // session中的用户信息
    var user = req.session.user;
    if(!user){
        var obj = _utils.setReturnobj(false, '301', '请先登录！');
        res.send(JSON.stringify(obj));
    }
    else{
        var username = user.username;
        // 数据库连接方法
        _utils.dbcollect('blog',function(collection){
            collection.find().toArray(function(err, doc){
                mongodb.close();
                if(err){
                    console.log(err);
                    var obj = _utils.setReturnobj(false, '300', '发送错误！');
                }
                else{
                    var obj = {statusCode:'200',records:doc};
                }
                res.send(JSON.stringify(obj));
            });
        });
    }
};