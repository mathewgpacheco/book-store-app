require('dotenv').config();
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Product= require('../models/ProductModel');

function getRegister(req,res,next){
    return res.render('../public/register.pug');
}
function register(req,res,next){
    let username = req.body.username;
    let password = req.body.password;

    User
    .findOne({username: username})
    .then(result=>{

        if(result){
            return res.render('../public/index.pug',{alert: 'Username already exists.'});
        }
        if(!result){
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                username: username,
                password: password
            })
            req.user = user;
            user
            .save()
            .then( result =>{
                let usr = {
                    _id: result._id,
                    username: result.username
                }
                const token = jwt.sign(usr,
                    process.env.ACCESS_TOKEN_SECRET,{
                        expiresIn: '1h'
                    });
                    req.session.token = token;
                    return res.redirect('/user/'+usr.username+'/store/1');
            })
        }
    })

}


function login(req,res,next){
    let username = req.body.username;
    let password = req.body.password;

    User
    .findOne({username: username})
    .then(result=>{
        if(result){

            result.
            validatePassword(password)
            .then(validated =>{
                if(!validated){
                    return res.render('../public/index.pug',{alert: 'Incorrect Password'});
                }
                let user = {
                    _id: result._id,
                    username: result.username
                }
                const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '1h'
                    });
                req.session.token = token;
                return res.redirect('/user/'+user.username+'/store/1');
            })
        }
        else {
            return res.render('../public/index.pug',{alert: 'Username does not exist'});
        }
    })
    return;
}

function logout(req,res,next){
    req.session.destroy((err)=>{
        if(err) {
            throw err;
        }
        return res.redirect('/');
    })

}

async function store(req,res,next){
    let id = req.user._id;
    let products = req.products;
    let genres = [];
    const g = await Product.find({}).select('genre').exec();
    for (let i=0;i<g.length;i++){
        genres.push(g[i].genre);
    }
    const unique = Array.from(new Set(genres));
    User 
    .findOne({_id: id})
    .exec()
    .then(result =>{
        return res.render('../public/dashboard.pug', {genres: unique,username: result.username,max: req.max, current: req.pageID,length: req.session.cart.length,products: products});
    })
}
module.exports = {
    getRegister,
    register,
    login,
    logout,
    store
}