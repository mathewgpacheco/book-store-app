require('dotenv').config();
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

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
            console.log('username already exists');
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
                console.log('user created');
                let usr = {
                    _id: result._id,
                    username: result.username
                }
                const token = jwt.sign(usr,
                    process.env.ACCESS_TOKEN_SECRET,{
                        expiresIn: '1h'
                    });
                    req.session.token = token;
                    return res.redirect('/user/'+usr.username+'/store');
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
                    console.log('wrong password');
                    return res.render('../public/index.pug',{alert: 'Incorrect Password'});
                }
                console.log('Log in success');
                let user = {
                    _id: result._id,
                    username: result.username
                }
                const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '1h'
                    });
                req.session.token = token;
                return res.redirect('/user/'+user.username+'/store');
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
        console.log('log out success');
        return res.redirect('/');
    })

}

function store(req,res,next){
    let id = req.user._id;
    let products = req.products;
    if(req.session.cart.length ==0 ){
        console.log('Cart is empty');
    }
    if(req.session.cart.length ==0 ){
        for(let i =0;i<req.session.cart.length;i++){
            console.log(req.session.cart[i].title);
        }
    }

    User 
    .findOne({_id: id})
    .exec()
    .then(result =>{
        return res.render('../public/dashboard.pug', {username: result.username, length: req.session.cart.length,products: products});
    })
}
module.exports = {
    getRegister,
    register,
    login,
    logout,
    store
}