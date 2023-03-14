const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = async function(req, res) {
    let user = req.body
    let check = await UserModel.findByEmail(user.email)
    if(check){
        res.status(400).send('Email existed')
        return
    }

    await bcrypt.hash(user.password, 2).then((hash) =>{
        user.password = hash
    })
    console.log(user);
    await UserModel.createUser(user).then((result) => {
        console.log(result)
        if(result){
            res.status(200).send(result)
        }else{
            res.status(400).send('error')
        }

    })
}

exports.login =  async(req,res) => {
    let user_login = req.body;
    let user_info = await UserModel.findByEmail(user_login.email);
    console.log(user_info);
    if(!user_info){
        res.status(404).send("Email not found !")
        return
    }
    await bcrypt.compare(user_login.password, user_info.password)
    .then(function(result) {
        if(!result){
            res.status(404).send("Incorrect password !")
        }
    });

    let token = jwt.sign({ name: user_info.name , email: user_info.email}, 'Mindx2023');
    console.log(token);
    res.status(200).send({"jwt": token,name: user_info.name, message: "Login successfully !"})

}


exports.list = async (req, res) => {
    try {
        const data = await UserModel.list()
        return res.status(200).send(data)
    } catch (error) {
        return res.status(400).send(error)
    }
}

exports.delete = async (req, res) => {
    let email = req.body.email
    try {
        await UserModel.delete(email)
        return res.status(200).send('Thanh cong')
    } catch(err){
        return res.status(400).send(err)
    }
}

