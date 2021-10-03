const Product = require('../models/ProductModel');
const Order = require('../models/OrderModel');
const User = require('../models/UserModel');

async function add(req,res,next){
    let title = req.body.title;
    let id = req.orderID;
    let username = req.user.username;
    let product = await Product.findOne({title: title});
    let data = {
        id: product._id,
        quantity: 1
    }
    let order = await Order.findOneAndUpdate({id: id}, {$push: {products: data}},{
        new: true,
        upsert: true
    });
    order.save();
    let user = await User.findOneAndUpdate({username: username}, {$push: {orders: order}},{
        new: true,
        upsert: true});
    user.save();
    console.log('done');
    res.redirect('/user/'+username+'/dashboard');
}

function remove(req,res,next){

}

module.exports ={
    add,
    remove,

}