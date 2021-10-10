
function existCart(req,res,next){
    if(!req.session.cart){
        console.log('cart DNE, creating one..');
        req.session.cart = [];
        return next();
    }
    console.log('cart length: '+ req.session.cart.length);
    next();
}
module.exports = {
    existCart
}