let express= require('express')
let router = express.Router()

//load other routers here
router.use(require(__dirname +'/users.js'))

//home page
router.get('/',(req,res)=>{
    res.render('../public/index.pug');
})

module.exports = router;