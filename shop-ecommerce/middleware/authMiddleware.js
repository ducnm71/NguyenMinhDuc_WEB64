// có 2 dạng user: user khách, admin
// Phải sử dụng thư viện jsonwebtoken -> tìm cách phân biệt được user thông thường, và user admin
// Phải có token trả về cho mỗi loại user
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Check user gui request len phai co token
// 1. Kiểm tra xem token có hợp lệ hay không
// Hoặc user có gửi lên token hay không
const protect = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith('Bearer')) {
    // Đã có token - nhưng hợp lệ hay không thì chưa biết
    try {
      // Bearer aabcsdfd.dsfdfsdfasd.asdfasfsdf
      const token = req.headers.authorization.split(' ')[1];
      const userVerify = jwt.verify(token, 'masobimat');
      const userId = userVerify.id;
      const userInfo = await userModel.findById(userId).select('-password');
      req.user = userInfo;
      next();
    } catch (e) {
      res.status(401);
      throw new Error('token invalid');
    }
  } else {
    res.status(401);
    throw new Error('Not authorization or no token');
  }
});

// Check user co token va phai có isAdmin = true
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Member is not admin');
  }
}

module.exports = {
  protect,
  isAdmin
}