let express= require('express')
let router = express.Router()
const productController = require('../controllers/products');
const userMiddleware = require('../middleware/user');
const orderMiddleware = require('../middleware/order');

//user related routes
router.post('/:productID/add', userMiddleware.authenticateToken, orderMiddleware.existCart, productController.add);
router.post('/:productID/remove', userMiddleware.authenticateToken, productController.remove);


module.exports = router;