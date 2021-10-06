const Order = require('../models/OrderModel');

function verifyOrder(req,res,next){

}
function processOrder(req,res,next){

}

function addOrder(req,res,next){

}

function clearOrder(req,res,next){
    if(req.session.cart.length !=0 || !req.session.cart){
        req.session.cart = [];
    }
    return res.redirect(201,'/user/'+req.user.username+'/dashboard');
}

//lists all orders a user has made
function getOrders(req,res,next){

}

//renders current items in a cart to page
function getCart(req,res,next){
    let cart =req.session.cart;
    return res.render('../public/cart.pug', {items: cart, username:req.user.username})
}

module.exports ={
    verifyOrder,
    processOrder,
    addOrder,
    clearOrder,
    getOrders,
    getCart,
}