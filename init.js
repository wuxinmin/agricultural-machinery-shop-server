// 引入
const mongoose = require('mongoose');
// 我们要连接的数据库
// 此处本地的数据库默认的27017可以不写后面是数据库名称
const db = 'mongodb://localhost:27017/shop'; 
// const db = 'mongodb://192.168.43.111:27017/shop'; 

// 引入所有的schema
const glob = require("glob");
const path = require("path"); // path属于自带的
exports.initSchemas = ()=>{
    // 把model中的所有的js文件都请求进来
    glob.sync(path.resolve(__dirname, './model', '*.js')).forEach(require)
}

exports.connect = ()=>{
    // 连接数据库 第二个参数就是配置参数意思是取解析url
    mongoose.connect(db, {useNewUrlParser: true})
    // 监听数据库连接是否成功
    mongoose.connection.on('disconnected', ()=>{
        // 如果连接失败就重新连接
        mongoose.connect(db);
    })
    // 数据库连接出现错误
    mongoose.connection.on('error',  err=>{
        console.log(err);
        mongoose.connect(db);
    })
    // 当打开连接
    mongoose.connection.once('open', ()=>{
        console.log("mongoDB连接成功");
    })
}