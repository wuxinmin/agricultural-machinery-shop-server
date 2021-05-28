const Koa = require('koa');
// 引入路由
const Router = require('koa-router');
const router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');

router.get('/insertType', async (ctx)=>{
    fs.readFile('./data/type.json', 'utf8', (err, data)=>{
        data = JSON.parse(data);
        let count = 0; // 计数器
        // 加载model,名字与发布模型的名字一一对应
        const Type = mongoose.model('Type');
        data.map((value, index)=>{
            console.log(value);
            // type.json读取的数据放入
            let type = new Type(value);
            // 然后保存
            type.save().then(()=>{
                count++;
                console.log("成功了：" + count + "条");

            }).catch(err=>{
                console.log("失败了：" + err);
            })
        })
    })
    ctx.body = "导入数据"
})
router.get('/getTypes', async (ctx)=>{
    // 通过mongoose桥梁加载对应model模型
    const Type = mongoose.model('Type');
    // 去数据库查询那8个类型
    await Type.find({}).exec().then(res=>{
        ctx.body = res;
    })

});
module.exports = router;