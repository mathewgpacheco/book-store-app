let express= require('express')
let router = express.Router()
const userController = require('../controllers/user');
const userMiddleware = require('../middleware/user');

//user related routes
router.get('/register',userController.getRegister);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout',userController.logout);
router.get('/dashboard', userMiddleware.authenticateToken, userController.dashboard);

module.exports = router;