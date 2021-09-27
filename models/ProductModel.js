const mongoose = require('mongoose');
const  Schema = mongoose.Schema; 

const productSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        unique: true,
        required: true,
    },
    stock: {
        type: Number,
    },
    price: {
        type: Number,
        default: 0
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
    const random = Math.floor(Math.random() * 50);
    this.stock = random;
    next();
})

module.exports = mongoose.model('Product', productSchema,'products');