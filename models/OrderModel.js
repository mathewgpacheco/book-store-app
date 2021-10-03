const mongoose = require('mongoose');
const  Schema = mongoose.Schema; 

const orderSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    submitted: {
        type: Boolean,
        default: false,
    },
    products:[{
        id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number
        }
    }],
});


module.exports = mongoose.model('Order', orderSchema,'orders');