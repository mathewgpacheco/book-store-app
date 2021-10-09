const Product = require('../models/ProductModel');

//make sure to render products partial before dash/ index
function getProducts(req,res,next){
    console.log('loading 10 random products');
    //for now, load 10 random products from the db.
    //will implement recomender system later
    Product
    .aggregate([{$sample: {size: 10}}])
    .exec()
    .then(results =>{
        req.products = results;
        next();
    })
}

function product(req,res,next){
    if(!req.params.productID){
        next();
    }
    req.productID = req.params.productID;
    next();
}
module.exports ={
    getProducts,
    product
}