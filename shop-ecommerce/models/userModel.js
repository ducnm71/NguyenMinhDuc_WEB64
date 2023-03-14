// khai báo cấu trúc bảng user
// thực hiện công việc mã hóa password tại đây
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
});

// Pre.save - Ma hoa password truoc khi luu
userSchema.pre('save', async function (next) {
  // mã hóa password bất cứ khi nào lưu thông tin user vào database
  // Nếu không sửa gì thông tin trường password -> Thì đi tiếp (next)
  // Nếu sửa -> phải mã hóa
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (e) {
    return next(e);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;