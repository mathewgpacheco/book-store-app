const mongoose = require('mongoose');
const  Schema = mongoose.Schema; 

const orderSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    products:[{
        _id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number
        }
    }],
    subtotal: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0,
    }
});


module.exports = mongoose.model('Order', orderSchema,'orders');