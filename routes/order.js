let express= require('express')
let router = express.Router()
const orderController = require('../controllers/order');
const userMiddleware = require('../middleware/user');
const orderMiddleware = require('../middleware/order');


//user related routes
router.post('/submit', 
userMiddleware.authenticateToken,
orderMiddleware.existCart,
orderController.verifyOrder,
orderController.processOrder,
orderController.addOrder,
orderController.clearOrder);

router.get('/user/:userID/orders',
userMiddleware.authenticateToken,
orderController.getOrders
)

router.get('/user/:userID/cart',
userMiddleware.authenticateToken,
orderMiddleware.existCart,
orderController.getCart
)



module.exports = router;