var express = require('express');
var router = express.Router();

const {registerUser, authLogin, getUserProfile, getAllUser} = require('../controller/userController')
const {protect, isAdmin} = require('../middleware/authMiddlware')

router.post('/', registerUser)

router.post('/', authLogin)

router.get('/profile',protect, getUserProfile)

router.get('/', isAdmin, getAllUser)
module.exports = router;
