const mongoose = require('mongoose');
// 引入加盐加密工具
const bcrypt = require('bcrypt');

// 创建模型
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // 唯一标识id
    userId: Schema.Types.ObjectId,
    // 设置用户是唯一的unique: true  这里的userName与password需要与前端Data中的名字一一对应上
    userName: {unique: true, type: String},
    password: String,
    createDate: {type: Date, default: Date.now()}
})

// pre在save之前干什么
userSchema.pre('save', function(next){
    // 随机生成salt，第一个参数是迭代次数
    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash)=>{
            if(err) return next(err);
            this.password = hash;
            next(); // 执行下一句
        });
    });
});

// 在model下定义一个方法 用来比较当前的密码与数据库密码是不是相等的
userSchema.methods = {
    comparePassword: (_password, password)=>{
        return new Promise((resolve, reject)=>{
            bcrypt.compare(_password, password, (err, isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}
// 发布模型
mongoose.model('User', userSchema);