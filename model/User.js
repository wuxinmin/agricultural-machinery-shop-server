const mongoose = require('mongoose');
// 创建模型
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // 唯一标识id
    userId: Schema.Types.ObjectId,
    // 设置用户是唯一的unique: true
    userName: {unique: true, type: String},
    passWord: String,
    createDate: {type: Date, default: Date.now()}
})

// 发布模型
mongoose.model('User', userSchema);