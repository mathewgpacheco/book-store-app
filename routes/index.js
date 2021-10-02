let express= require('express')
let router = express.Router()
const productController = require('../controllers/products');
const indexController = require('../controllers/index');


//default routes
router.get('/', indexController.home);

module.exports = router;