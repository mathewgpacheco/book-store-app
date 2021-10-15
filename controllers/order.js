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
    let total= 0;
    let subtotal;
    let tax;

    for(let i =0;i< cart.length;i++){
        total = total + cart[i].price;
    }

    subtotal = total;
    tax = total * 0.13;
    total = total * 1.13;

    let t =total.toString();
    let tformat = parseFloat(t).toFixed(2);

    
    let s = subtotal.toString();
    let sformat = parseFloat(s).toFixed(2);

    
    let ta =tax.toString();
    let taformat = parseFloat(ta).toFixed(2);

    const order = new Order({
        id: parseInt(size),
        products: [],
        subtotal: sformat,
        tax:  taformat,
        total: tformat
    })
    
    for(let i =0;i<cart.length;i++){
        order.products.push({
            _id: cart[i].id,
            quantity: cart[i].quantity,

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
        return res.redirect(201,'/user/'+req.user.username+'/store');
    }
    return res.redirect(201,'/user/'+req.user.username+'/store');
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
        return res.render('../public/orders.pug',{result: result,length: req.session.cart.length, username:username});
    })
}

//renders current items in a cart to page
function getCart(req,res,next){
    let cart =req.session.cart;
    let total= 0;
    let subtotal;
    let tax;

    for(let i =0;i< cart.length;i++){
        total = total + cart[i].price;
    }

    subtotal = total;
    tax = total * 0.13;
    total = total * 1.13;

    let t =total.toString();
    let tformat = parseFloat(t).toFixed(2);

    
    let s = subtotal.toString();
    let sformat = parseFloat(s).toFixed(2);

    
    let ta =tax.toString();
    let taformat = parseFloat(ta).toFixed(2);

    return res.render('../public/cart.pug', {subtotal: sformat,tax: taformat, total: tformat,items: cart, username:req.user.username, length: cart.length})
}

module.exports ={
    verifyOrder,
    processOrder,
    addOrder,
    clearOrder,
    getOrders,
    getCart,
}