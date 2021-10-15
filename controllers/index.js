
function home(req,res,next){
    console.log('landing page');
    return res.render('../public/index.pug',);
}

function about(req,res,next){
    console.log('landing page');
    return res.render('../public/about.pug',);
}


module.exports ={
    home,
    about
}