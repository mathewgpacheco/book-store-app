const Product = require('../models/ProductModel');
const Order = require('../models/OrderModel');
const User = require('../models/UserModel');

async function add(req,res,next){
    let title = req.body.title;
    let id = req.orderID;
    let username = req.user.username;
    let product = await Product.findOne({title: title});
    let data = {
        _id: product._id,
        quantity: 1
    }
    let order = await Order.findOneAndUpdate({id: id}, {$push: {products: data}},{
        new: true,
        upsert: true
    });
    order.save();

    let user = await User.findOne({username: username});
    if (!user.orders.includes(order._id)){
        user.orders.push(order);
        user.save();
    }
    res.redirect('/user/'+username+'/dashboard');
}

function remove(req,res,next){

}

module.exports ={
    add,
    remove,

}