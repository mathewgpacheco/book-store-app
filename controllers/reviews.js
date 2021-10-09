const Review = require('../models/ReviewModel');
const User = require('../models/UserModel');
const Product = require('../models/ProductModel');

async function addReview(req,res,next){
    let text = req.body.review;
    let username =req.user.username;
    console.log('hre');
    console.log(text);
    let product = req.productID;
    console.log(product)
    return res.redirect('/user/'+username+'/dashboard');
}

module.exports ={
    addReview
}