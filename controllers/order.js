const Order = require('../models/OrderModel');
const User = require('../models/UserModel');
const Product = require('../models/ProductModel');
function verifyOrder(req,res,next){
    let cart = req.session.cart;

    //strip properties into seperate arrays to validate in db
    let cartIDs = [];
    for(let i =0;i<cart.length;i++){
        cartIDs.push(cart[i].id);
    }
    Product
    .find({_id: {$in: cartIDs}})
    .select('name stock')
    .then(result=>{
        if(result){
            for(let i =0;i<cart.length;i++){
  
                if( cart[i].quantity <= result[i].stock && result[i].stock > 0){
                    return next();
                    
                }
                
                else {
                    return res.status(409).send({msg: cart[i].name+' does not  have enough stock to complete this order.'});
                }
            }
        }
        else {
            console.log('Product: does not exist');
            return res.status(409).send({msg: 'Product does not exist'});
        }
    })
    return;
}

function processOrder(req,res,next){
    let cart =req.session.cart;
    for(let i =0;i<cart.length;i++){
        Product
        .findOneAndUpdate({_id: cart[i].id}, {$inc: {stock: -1 * cart[i].quantity}})
        .then(result =>{
            return next();
        })
    }
}

//add order to db
async function addOrder(req,res,next){
    let cart = req.session.cart;
    let size = await Order.count();
    const order = new Order({
        id: parseInt(size),
        products: []
    })

    for(let i =0;i<cart.length;i++){
        order.products.push({
            _id: cart[i].id,
            quantity: cart[i].quantity
        })
    }
    
    order.save();

    let result = await User.findOneAndUpdate({username:req.user.username},{$push: {orders: order}});

    if(result){
        next();
    }
    return;
}

function clearOrder(req,res,next){
    if(req.session.cart.length !=0 || !req.session.cart){
        req.session.cart = [];
    }
    return res.redirect(201,'/user/'+req.user.username+'/dashboard');
}

//lists all orders a user has made
function getOrders(req,res,next){
    let username = req.user.username;

    User
    .findOne({username: username})
    .select('orders')
    .populate({
        path: 'orders',
        model: 'Order',
        populate: {
            path: 'products._id',
            model: 'Product'
        }
    })
    .exec()
    .then(result =>{
        return res.render('../public/orders.pug',{result: result,username:username});
    })
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