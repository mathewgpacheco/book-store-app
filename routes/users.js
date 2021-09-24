let express= require('express')
let router = express.Router()
const userController = require('../controllers/user');

//user related routes
router.get('/register',userController.getRegister);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;