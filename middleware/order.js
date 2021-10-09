
function existCart(req,res,next){
    if(!req.session.cart){
        req.session.cart = [];
        next();
    }
    console.log('cart length: '+ req.session.cart.length);
    next();
}
module.exports = {
    existCart
}