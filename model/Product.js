// 利用mongoose将MongoDB与index建立起桥梁
const mongoose = require('mongoose');
// 创建模型 Schema属于mongoose下的方法
const Schema = mongoose.Schema;
// 需要实例化建立一个模型
const productSchema = new Schema({
    // 这里面的key与value就对应数据库的kv数据
    id: Schema.Types.ObjectId, // 创建唯一id
    name: String,
    img: String,
    price: Number,
    company: String,
    city: String,
    type: Number
});

// 写好之后就需要发布出去
mongoose.model('Product', productSchema);