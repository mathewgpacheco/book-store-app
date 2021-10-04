const Order = require('../models/OrderModel');

function existOrder(req,res,next){
    if(!req.session.cart){
        req.session.cart = [];
        next();
    }
    next();
}
module.exports = {
    existOrder
}