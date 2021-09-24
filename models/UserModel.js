const mongoose = require('mongoose');
const  Schema = mongoose.Schema; 
const bcrpyt = require('bcrypt');

const userSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type:String,
        required: true
    }
});

userSchema.pre('save', async function(next){
    const user = this;
    const hash = await bcrpyt.hash(this.password,10);

    this.password =hash;
    next();
})

userSchema.methods.validatePassword = async function(password){
    const user = this;
    const compare = await bcrpyt.compare(password, user.password);

    return compare;
}

module.exports = mongoose.model('User', userSchema,'users');