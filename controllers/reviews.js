const Review = require('../models/ReviewModel');
const User = require('../models/UserModel');
const Product = require('../models/ProductModel');
const mongoose = require('mongoose');

function addReview(req,res,next){
    let text = req.body.review;
    let productID = req.productID;
    let username =req.user.username;
    let id = req.user._id;
    const review = new Review({
        _id: mongoose.Types.ObjectId(),
        owner: id,
        description: text
    });
    review.save();
    Product
    .findOneAndUpdate({_id: productID}, {$push: {reviews: review}}).exec()  ;

    User
    .findOneAndUpdate({_id: id}, {$push: {reviews: review}}).exec();
    return res.redirect('/products/'+productID);
}

module.exports ={
    addReview
}