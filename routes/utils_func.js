var mongodb = require('./db');
// 公共方法
var utils = {};
module.exports = utils;
utils.setReturnobj = function(flag, code, msg){
    if(!flag) {
        return {
            statusCode: code,
            message: msg
        }
    }
    else{
        return {
            statusCode: '200',
            message: '提交成功！'
        }
    }
};
// 数据库连接方法
utils.dbcollect = function(tablename, callback){
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        // 读取 tablename 集合
        db.collection(tablename, function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            callback(collection);
        });
    });
};