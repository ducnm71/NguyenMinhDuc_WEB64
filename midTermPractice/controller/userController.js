const asyncHandle = require('express-async-handler')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const registerUser =  asyncHandle(async (req, res) => {
    const {name,email,password} = req.body
    const userExist = await userModel.findOne({email})
    if(userExist) {
        res.status(400)
        throw new Error('User have existed')
    }

    const newUser = userModel.create({name,email,password})
    if(newUser) {
        res.status(200).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin, 
            token: jwt.sign({id: newUser.id}, 'masobimat', {
                expiresIn: '1d'
            })
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})



const authLogin = () => {

}

const getUserProfile = () => {

}
const getAllUser = asyncHandle(async (req,res) => {
    const users = await userModel.find({})
    res.json(users)
})

module.exports = {
    registerUser, 
    authLogin, 
    getUserProfile, 
    getAllUser
}