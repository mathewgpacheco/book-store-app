let express= require('express')
let router = express.Router()
const orderController = require('../controllers/order');
const userMiddleware = require('../middleware/user');
const orderMiddleware = require('../middleware/order');


//user related routes
router.post('/submit', 
userMiddleware.authenticateToken,
orderMiddleware.existOrder,
orderController.verifyOrder,
orderController.processOrder,
orderController.addOrder,
orderController.clearOrder);


module.exports = router;