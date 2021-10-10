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
            return res.redirect('/');
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
                    return res.redirect('/user/'+usr.username+'/dashboard');
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
                    return res.redirect('/');
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
                return res.redirect('/user/'+user.username+'/dashboard');
            })
        }
        else {
            return res.status(404).send("Username does not exist");
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

async function dashboard(req,res,next){
    let user = req.user;
    let products = req.products;
    const result = await User.findOne({_id: user._id});
    return res.render('../public/dashboard.pug', {username: result.username, products: products});
}
module.exports = {
    getRegister,
    register,
    login,
    logout,
    dashboard
}