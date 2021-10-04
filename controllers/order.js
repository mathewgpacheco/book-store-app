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

function viewOrder(req,res,next){

}

module.exports ={
    verifyOrder,
    processOrder,
    addOrder,
    clearOrder,
    viewOrder
}