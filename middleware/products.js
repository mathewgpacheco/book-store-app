const Product = require('../models/ProductModel');

//make sure to render products partial before dash/ index
async function getProducts(req,res,next){
    console.log('loading 10 random products');
    //for now, load 10 random products from the db.
    //will implement recomender system later
    req.pageID = parseInt(req.params.pageID);
    if(req.pageID <= 0){
        req.pageID =1;
    }
    const size = await Product.count();
    if(req.pageID > (size/15)){
        req.max = Math.ceil(size/15);
    }
    console.log('max: '+req.max);
    const startIndex = ((req.pageID- 1) * 15);
    Product
    .find({})
    .skip(startIndex)
    .limit(15)
    .exec()
    .then(results =>{
        req.products = results;
        next();
    });
}

function product(req,res,next){
    req.productID = req.params.productID;
    next();
}
module.exports ={
    getProducts,
    product
}