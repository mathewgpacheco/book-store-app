let express= require('express')
let router = express.Router()
const indexController = require('../controllers/index');


//default routes
router.get('/', indexController.home);

module.exports = router;