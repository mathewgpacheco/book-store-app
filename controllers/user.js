require('dotenv').config();
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

function getRegister(req,res,next){
    res.render('../public/register.pug');
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

            user.save();
            console.log('user created');
            return res.redirect('/');
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
                console.log('succiess');
                let user = {
                    _id: result._id,
                    username: result.username
                }
                const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '1h'
                    });
                req.session.token = token;
                return res.redirect('/');
            })
        }
        else {
            return res.status(404).send("Username does not exist");
        }
    })
}

function logout(req,res,next){


}

function dashboard(req,res,next){
    let user = req.user;
    User
    .findOne({_id:user._id})
    .then(result =>{
        return res.render('../public/dashboard.pug', {name: result.username});
    })
}
module.exports = {
    getRegister,
    register,
    login,
    logout,
    dashboard
}