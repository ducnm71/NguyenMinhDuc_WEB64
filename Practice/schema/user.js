const mongoose = require('../mongoose.service').mongoose;
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    password: String
});
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
userSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Users', userSchema)
