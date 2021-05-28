const Koa = require('koa');
// 引入路由
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const fs = require('fs'); // 对系统的文件或者目录进行读写操作
// 插入商品信息
router.get('/insertProductInfo', async (ctx)=>{
    // 读文件
    fs.readFile('./data/product.json', 'utf8', (err, data)=>{
        // String型转化为JSON的数据
        data = JSON.parse(data);
        let count = 0; // 计数器
        // 加载model,名字与发布模型的名字一一对应
        const Product = mongoose.model('Product');
        data.map((value, index)=>{
            console.log(value);
            // 把product.json读取的数据放入
            let product = new Product(value);
            // 自定义方法，取1-8的随机数
            product.type = Math.floor(Math.random()*8) + 1;
            // 然后保存
            product.save().then(()=>{
                count++;
                console.log("成功了：" + count + "条");

            }).catch(err=>{
                console.log("失败了：" + err);
            })
        })
    });
    ctx.body = '导入数据';
})
router.get('/getProductByType', async (ctx)=>{
    // 获取商品信息就需要加载商品模型
    const Product = mongoose.model('Product'); 
    // get获取前端传过来的值 ctx.query, 通过typeId来查询 skip指的是从哪一条数据开始,query获取到的是字符串 limit从那一条数据结束
    await Product.find({type: ctx.query.typeId}).skip(parseInt(ctx.query.start)).limit(parseInt(ctx.query.limit)).exec().then(res=>{
        ctx.body = res;
    })
})
// 详情页面的请求
router.get('/getDetail', async (ctx)=>{
    // 连接加载模型
    const Product = mongoose.model('Product');
    await Product.findOne({_id: ctx.query.id}).exec().then(res=>{
        ctx.body = res; 
    })

})
// 之后再给暴露出去
module.exports = router; 