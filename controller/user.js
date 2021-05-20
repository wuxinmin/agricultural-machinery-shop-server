const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');


// 我项目中注册是post请求，所以接收的是post请求
router.post('/registUser', async (ctx)=>{
    // console.log('注册接口请求成功');
    // 返回数据
    // ctx.body = "请求成功"
    
    // 获取model
    const User = mongoose.model('User'); // 此处的User与model中暴露出的User对应上才可以找到
    // 接收post请求封装成User对象
    let newUser = new User(ctx.request.body);
    // 使用mongoose下方法保存用户信息
    await newUser.save().then(()=>{// 保存成功
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch(err=>{ // 保存失败
        ctx.body = {
            code: 500,
            message: err
        }
    })
});

// 登录接口post请求
router.post('/loginUser', async (ctx)=>{
    // 接收前端的用户名、密码的数据
    let loginUser = ctx.request.body;
    let userName = loginUser.userName;
    let password = loginUser.password;
    // 接收完数据，之后需要和数据库相关连，数据库相关的是model，所以引入model
    const User = mongoose.model('User'); // 此处的User与model中暴露出的User对应
    // 引入之后需要进行比对
    // 先查询用户名是否存在 userName进行比对
    await User.findOne({userName: userName}).exec().then(async (result)=>{
        if(result){
            //如果用户名存在我们就需要去比对密码
            // 实例化方法需要new出来才可以使用
            const newUser = new User();
            // comparePassword方法返回的是一个promise对象
            await newUser.comparePassword(password, result.password).then(isMatch=>{
                if(isMatch){
                    // 登录成功
                    ctx.body = {
                        code: 200,
                        message: "登录成功",
                        userInfo: result
                    }
                }else{
                    // 登录失败 
                    ctx.body = {
                        code: 201,
                        message: "登录失败"
                    }
                }
            })

        }else{
            ctx.body = {
                code: 201,
                message: "用户名不存在"
            }
        }
    });
})
// 将router暴露出去
module.exports = router;