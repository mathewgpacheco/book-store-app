let express= require('express')
let router = express.Router()
const productController = require('../controllers/products');
const userMiddleware = require('../middleware/user');
const orderMiddleware = require('../middleware/order');
const reviewController = require('../controllers/reviews');
const productMiddleware = require('../middleware/products');
//user related routes
router.post('/:productID/add', userMiddleware.authenticateToken, orderMiddleware.existCart, productMiddleware.product,productController.add, productController.redirect);
router.post('/:productID/remove', userMiddleware.authenticateToken,productMiddleware.product, productController.remove);
router.get('/:productID/', userMiddleware.authenticateToken, productMiddleware.product, productController.getProduct);
router.post('/product', userMiddleware.authenticateToken,productController.findProduct);
router.post('/:productID/review', userMiddleware.authenticateToken, productMiddleware.product,reviewController.addReview);
module.exports = router;