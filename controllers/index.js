
function home(req,res,next){
    console.log('this is index');
    res.render('../public/index.pug');
}


module.exports ={
    home
}