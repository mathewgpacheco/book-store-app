const Product = require('../models/ProductModel');
const mongoose = require('mongoose');
async function add(req,res,next){
    console.log('cart: '+ req.session.cart);
    let id = req.productID;
    let username = req.user.username;
    const product = await Product.findOne({_id: id});
    let data = {
        title: product.title,
        imgPath: product.imgPath,
        id: mongoose.Types.ObjectId(product._id),
        quantity: 1
    }

    req.session.cart.push(data);
    console.log('cart after add: '+ req.session.cart);
    console.log('cart length right after add: '+req.session.cart.length);
    return next();
}

function redirect(req,res,next){
    let username = req.user.username;
    console.log('cart length in redirect: '+req.session.cart.length);
    return res.redirect('/user/'+username+'/dashboard');
}
function remove(req,res,){
    let cart =req.session.cart;
    let toRemove = req.productID;
    let index;
    for(let i=0;i<cart.length;i++){
        if(toRemove == cart[i].id){
            index  =i;
            console.log('ind: '+index);
        }
    }
    cart.splice(index, 1);
    console.log('Removing id: '+req.productID);
    return res.redirect('/order/cart');

}

function getProduct(req,res,next){
    let id = req.productID;
    Product
    .findOne({_id:id})
    .then(result =>{
        return res.render( '../public/product.pug',{product: result, username:req.user.username});
    })
    .catch(err=>{
        console.log(err);
        return;
    })
    
}

function findProduct(req,res,next){
    let param = req.body.param;
    Product 
    .findOne({title: new RegExp(param)})
    .then(result=>{
        if(!result){
            console.log('Product does not exist');
            return res.redirect('/user/'+username+'/dashboard');
        }
        return res.redirect('/products/'+result._id);

    })
}

module.exports ={
    add,
    remove,
    getProduct,
    findProduct,
    redirect
}