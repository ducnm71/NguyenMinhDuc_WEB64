var express = require('express');
var router = express.Router();
const { registerUser, authLogin, getUserProfile, getAllUser, updateUserProfile } = require('../controller/userController');
// ham protect: kiem tra xem user co gui len token dung hay khong
// ham isAdmin: kiem tra xem user do co phai la admin hay khong
const {protect, isAdmin} = require('../middleware/authMiddleware');

// 1. @desc: Register a new user
// @route: POST /api/users
// @access: Public - return token
router.post('/', registerUser);

// 2. @desc: User can login to system
// @route: POST /api/users/login
// @access: Public - return token
router.post('/login', authLogin);

// 3. @desc: Get user profile
// @route: GET /api/users/profile
// @access: Private - Su dung token
router.get('/profile', protect, getUserProfile);


// 4. @desc: update user profile
// @route: PUT /api/users/profile
// @access: Private
router.put('/profile', protect, updateUserProfile);

// 5. @desc: Get all users
// @route: GET /api/users
// @access: Private/admin
router.get('/', protect, isAdmin, getAllUser);

module.exports = router;
