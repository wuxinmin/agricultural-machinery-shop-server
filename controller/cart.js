const Koa = require('koa');
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');

router.post('/addCart', async (ctx)=>{
    // 与发布的名称一一对应
    const Cart = mongoose.model('Cart');
    // 接收post请求传过来的数据
    const cart = new Cart(ctx.request.body);
    await cart.save().then(()=>{
        ctx.body = {
            code: 200,
            message: '添加购物车成功'
        }
    }).catch(err=>{ // 保存失败
        ctx.body = {
            code: 500,
            message: err
        }
    })

})

// 查询
router.get('/getCart', async (ctx)=>{
    const Cart = mongoose.model('Cart');
    await Cart.find({
        userId: ctx.query.userId
    }).populate('productId').exec().then((res)=>{
        ctx.body = res;
    })
})

// 删除
router.post('/delCart', async function (ctx){
    const Cart = mongoose.model('Cart');
    await Cart.where({
        productId: ctx.request.body.id
    }).deleteOne()
    ctx.body = {
        code: 0
    }
})
module.exports = router;