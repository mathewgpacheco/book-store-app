
function existCart(req,res,next){
    if(!req.session.cart){
        req.session.cart = [];
        next();
    }
    next();
}
module.exports = {
    existCart
}