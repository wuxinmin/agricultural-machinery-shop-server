// 引入koa，使用require引入
const Koa = require('koa');
const app = new Koa();

// 将连接数据库的文件引入
const {connect} = require('./init');
connect();

app.use(async (ctx)=>{ // 上下文
    ctx.body = "hello"
})

// 监听端口
app.listen(3000, ()=>{
    console.log('服务已经开启');
})
