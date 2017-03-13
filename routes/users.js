var _utils = require('./utils_func');
var mongodb = require('./db');
var Users = function(user){
    this.name = user.username;
    this.password = user.password;
}

module.exports = Users;
// 获取用户
Users.get = function(userobj, callback){
    _utils.dbcollect('users',function(collection){
        // 查找 name 属性为 username 的文档
        collection.findOne(userobj, function(err, doc) {
            mongodb.close();
            if(err){
                callback(err);
            }
            else {
                if (doc) {
                    var users = new Users(doc);
                    callback(err,users);
                } else {
                    callback(err,null);
                }
            }
        });
    });
}
// 新建保存
Users.prototype.save = function(callback){
    var users = {
        name : this.name,
        password : this.password
    };
    // 数据库连接方法
    _utils.dbcollect('users',function(collection){
        collection.insert(users, function(err, doc){
            mongodb.close();
            callback(err, doc);
        });
    });
}
