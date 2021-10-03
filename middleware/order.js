const Order = require('../models/OrderModel');

async function existOrder(req,res,next){
    if(!req.orderID){
        req.orderID=0;
    }
    let size = await Order.count();
    Order
    .findOneAndUpdate({id: req.orderID},{},{new: true, upsert: true})
    .then(result =>{
        result.save();
        next();
    })
}
module.exports = {
    existOrder
}