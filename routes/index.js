let express= require('express')
let router = express.Router()
const indexController = require('../controllers/index');


//default routes
router.get('/', indexController.home);
router.get('/about', indexController.about);

module.exports = router;