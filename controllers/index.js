
function home(req,res,next){
    console.log('landing page');
    return res.render('../public/index.pug',);
}


module.exports ={
    home
}