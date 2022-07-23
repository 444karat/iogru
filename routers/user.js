const express = require('express');
const jwt = require('../servises/jwt.servis')
const user_controller = require('../controllers/userCRUD')

const router = express.Router();

router.route('/users')
    .post(user_controller.create)
    .get(jwt().authenticateToken,user_controller.read)
    .patch(user_controller.update)
    .delete(jwt().authenticateToken,user_controller.delete);



module.exports=router;