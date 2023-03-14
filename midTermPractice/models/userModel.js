const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }, 
    isAdmin: {
        type: Boolean,
        require: true,
        default: false
    }
})

//Pre-save
userSchema.pre('save', async (next) =>{
    //ma hoa pass bat khi nao luu user vao db
    //neu k sua pass -> di tiep
    if(!this.isModified('password')) return next()

    try{
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        return next()

    }catch(e){
        return next(e)
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User