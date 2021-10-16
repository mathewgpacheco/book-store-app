const Product = require('../models/ProductModel');
const mongoose = require('mongoose');
const elasticlunr = require('elasticlunr');

const index = elasticlunr(function(){
    this.addField('title');
    this.addField('_id');
    this.setRef('_id');
})
function add(req,res,next){
    let id = req.productID;

    Product 
    .findOne({_id:id})
    .exec() 
    .then(product=>{
        let data = { 
            title: product.title,
            imgPath: product.imgPath,
            price: product.price,
            id: mongoose.Types.ObjectId(product._id),
            quantity: 1
        }
        req.session.cart.push(data);
        return next();
    }).catch(err=>{
        console.log('Something went wrong: '+err);
        return next();
    })
}

function redirect(req,res,next){
    let username = req.user.username;
    let pageID = req.pageID;
    console.log('Item added. Cart length: '+req.session.cart.length);
    if(!pageID){
        return res.redirect('/user/'+username+'/store/1');
    }
    return res.redirect('/user/'+username+'/store/'+pageID);
}
function remove(req,res,){
    let toRemove = req.productID;
    let index;
    for(let i=0;i<req.session.cart.length;i++){
        if(toRemove == req.session.cart[i].id){
            index  =i;
        }
    }
    req.session.cart.splice(index, 1);
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
    .exec()
    .then(result =>{
        return res.render( '../public/product.pug',{product: result, length: req.session.cart.length, username:req.user.username});
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
    return res.render('../public/dashboard.pug', {username: username, length: req.session.cart.length,products: array, query:'Top results for: '+'"'+param+'"'});
}

module.exports ={
    add,
    remove,
    getProduct,
    findProduct,
    redirect
}