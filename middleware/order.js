const Order = require('../models/OrderModel');

function existOrder(req,res,next){
    console.log('in order');
    if(!req.orderID){
        req.orderID =0;
    }
    Order
    .findOne({id: req.orderID})
    .then(result=>{
        if(!result || result.submitted){
            let id = req.orderID+1;
            const order = new Order({
                id: id,
                submitted: false,
                products: []
            })
            req.orderID =id;
            order.save();
            next();
        }
        else{
            next();
        }
    })
}
module.exports = {
    existOrder
}