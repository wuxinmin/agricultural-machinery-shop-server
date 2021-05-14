// 引入
const mongoose = require('mongoose');
// 我们要连接的数据库
// 此处本地的数据库默认的27017可以不写后面是数据库名称
const db = 'mongodb://localhost:27017/shop'; 


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