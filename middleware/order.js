
function existCart(req,res,next){
    if(!req.session.cart){
        console.log('cart DNE, creating one..');
        req.session.cart = [];
        return next();
    }
    next();
}
module.exports = {
    existCart
}