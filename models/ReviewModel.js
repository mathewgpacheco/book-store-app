const mongoose = require('mongoose');
const  Schema = mongoose.Schema; 

const reviewSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    product: {type: mongoose.SchemaType.ObjectId, ref: 'Product'},
    owner: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    review: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Review', reviewSchema,'reviews');