const mongoose = require('mongoose');
const  Schema = mongoose.Schema; 

const productSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true
        
    },
    stock: {
        type: Number,
    },
    price: {
        type: Number,
        default: 0
    },
    imgPath: {
        type: String
    },
    link: {
        type: String
    },
    reviews: {
        type: [Number],
    }

});

productSchema.pre('save', async function(next){
    const product = this;
    const random = Math.floor(Math.random() * 10);
    this.stock = random;
    next();
})

module.exports = mongoose.model('Product', productSchema,'products');