let express= require('express');
let app = express();
let router = express.Router();
const userController = require('../controllers/user');
const userMiddleware = require('../middleware/user');
const productMiddleware = require('../middleware/products');

//user related routes
router.get('/register',userController.getRegister);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout',userController.logout);
router.get('/:userID/dashboard/', userMiddleware.authenticateToken,  productMiddleware.getProducts, userController.dashboard);

app.param("userID", function(req,res,next){
    next();
  })
module.exports = router;