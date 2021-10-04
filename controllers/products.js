const Product = require('../models/ProductModel');

async function add(req,res,next){
    let title = req.body.title;
    let username = req.user.username;
    let product = await Product.findOne({title: title});
    let data = {
        _id: product._id,
        quantity: 1
    }
    req.session.cart.push(data);
    res.redirect('/user/'+username+'/dashboard');
}

function remove(req,res,next){
    
}

module.exports ={
    add,
    remove,

}