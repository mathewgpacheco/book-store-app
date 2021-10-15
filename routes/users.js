let express= require('express');
let router = express.Router();
const userController = require('../controllers/user');
const userMiddleware = require('../middleware/user');
const productMiddleware = require('../middleware/products');
const orderMiddleware = require('../middleware/order');

//user related routes
router.get('/register',userController.getRegister);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout',userController.logout);
router.get('/:userID/store/:pageID', userMiddleware.authenticateToken,productMiddleware.getProducts, orderMiddleware.existCart, userController.store);

module.exports = router;