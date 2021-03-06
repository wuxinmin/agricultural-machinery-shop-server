const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const cartSchema = new Schema({
    ID: ObjectId,
    productId: {
        type: ObjectId,
        // 关联到Product这个集合上，就是指向联合查询的model 
        ref: 'Product'
    },
    userId: ObjectId,
    createDate: {type: Date, default: Date.now()}
});

// 发布出去
mongoose.model('Cart', cartSchema)