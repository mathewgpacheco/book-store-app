const mongoose = require('mongoose');
const  Schema = mongoose.Schema; 

const reviewSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    owner: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    description: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Review', reviewSchema,'reviews');