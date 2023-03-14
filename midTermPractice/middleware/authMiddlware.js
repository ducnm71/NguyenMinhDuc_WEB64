const asyncHandle = require('express-async-handler')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const protect = asyncHandle( async ( req,res,next) => {
    const authorization = req.headers.authorization
    if(authorization && authorization.startsWith('Bearer')){
        try{

            const token = req.headers.authorization.split(' ')[1]
            const userVerify = jwt.verify(token, 'masobimat')
            const userId = userVerify.id
            const userInfor = await userModel.findById(userId).select('-password')
            req.user = userInfor
            next()

        } catch(e) {
            res.status(401)
            throw new Error('token invalid')
        }
    } else{
        res.status(401)
        throw new Error('Not authorization or no token')
    }
})

const isAdmin = (req,res,next) =>{
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Member')
    }
}

module.exports = {
    protect,
    isAdmin
}