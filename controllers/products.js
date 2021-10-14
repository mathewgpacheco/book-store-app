const Product = require('../models/ProductModel');
const mongoose = require('mongoose');
const elasticlunr = require('elasticlunr');
const { query } = require('express');

const index = elasticlunr(function(){
    this.addField('title');
    this.addField('_id');
    this.setRef('_id');
})
async function add(req,res,next){
    let id = req.productID;
    const product = await Product.findOne({_id: id}).exec();
    let data = {
        title: product.title,
        imgPath: product.imgPath,
        id: mongoose.Types.ObjectId(product._id),
        quantity: 1
    }

    req.session.cart.push(data);
    return next();
}

function redirect(req,res,next){
    let username = req.user.username;
    console.log('Item added. Cart length: '+req.session.cart.length);
    return res.redirect('/user/'+username+'/store');
}
function remove(req,res,){
    let cart =req.session.cart;
    let toRemove = req.productID;
    let index;
    for(let i=0;i<cart.length;i++){
        if(toRemove == cart[i].id){
            index  =i;
        }
    }
    cart.splice(index, 1);
    console.log('Item removed. Cart length: '+req.session.cart.length);
    return res.redirect('/user/'+req.user.username+'/cart');

}

function getProduct(req,res,next){
    let id = req.productID;
    Product
    .findOne({_id:id})
    .populate({
        path: 'reviews',
        model: 'Review',
        populate: {
            path: 'owner',
            model: 'User'
        },
    })
    .then(result =>{
        return res.render( '../public/product.pug',{product: result, username:req.user.username});
    })
    .catch(err=>{
        console.log(err);
        return;
    })
    
}

async function findProduct(req,res,next){
    let param = req.body.param;
    let username = req.user.username;
    const results = await Product.find({});
    let array = [];
    for(let i =0;i<results.length; i++){
        let doc = {
            title: results[i].title,
            _id: mongoose.Types.ObjectId(results[i]._id)
        }
        index.updateDoc(doc);
    }
    let r = (index.search(param,{})).splice(0,10);

    for(let k = 0;k<r.length;k++){
        let p = await Product.findOne({_id: r[k].ref}).exec();
        array.push(p);
    }
    return res.render('../public/dashboard.pug', {username: username, products: array, query:'Top results for: '+'"'+param+'"'});
}

module.exports ={
    add,
    remove,
    getProduct,
    findProduct,
    redirect
}