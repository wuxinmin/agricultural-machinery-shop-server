// 引入koa，使用require引入
const Koa = require('koa');
const app = new Koa();

// 解决跨域问题
const cors = require('koa2-cors');
app.use(cors({
    // 指定某些地址可以访问
    origin: ["http://192.168.43.111:8081"],
    // origin: ["http://localhost:8081"],
    // 配置证书
    credentials: true
}));

// 接收前端post请求，并解析post请求
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// 加载路由
const Router = require('koa-router');
// 引入控制器文件
let user = require('./controller/user');
let product = require('./controller/product');
let type = require('./controller/type');
let cart = require('./controller/cart');

let router = new Router();
router.use('/user', user.routes());
router.use('/product', product.routes());
router.use('/type', type.routes())
router.use('/cart', cart.routes())

app.use(router.routes());
// 此方法如果配置的是get请求就只能接收get请求post同理
app.use(router.allowedMethods());


// 将连接数据库的文件引入
const {connect, initSchemas} = require('./init');
// 这里我们必须等待connect执行完毕之后才可以执行initSchemas
// 所以使用async await, 并且利用立即执行函数调用
(
    async ()=>{
        await connect();
        initSchemas();
    }
)()

app.use(async (ctx)=>{ // 上下文
    ctx.body = "hello"
})

// 监听端口
app.listen(3000, ()=>{
    console.log('服务已经开启');
})
