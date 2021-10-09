
function home(req,res,next){
    console.log('landing page');
    res.render('../public/index.pug',);
}


module.exports ={
    home
}