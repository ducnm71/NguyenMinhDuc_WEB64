var express = require('express');
var router = express.Router();
const userModel = require('../models/user.model')
const {registerValidation, loginValidation} = require('../validation/validation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { route } = require('.');
const authMiddleware = require('../middleware/authMiddleware')

//1.viet api dang ki user moi
// - validate thong tin user
//- kiem tra email ton tai chua
//- khi luu thong tin -> ma hoa password
// - tao user moi trong bang user cua mongodb

router.post('/register', async (req, res) => {
  //validate user
  const {error} = registerValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  //check email exists in db
  const emailExists = await userModel.findOne({email: req.body.email})
  if (emailExists) return res.status(400).send('Email existed')

  //hash password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  //save user
  const newUser = new userModel()
  newUser.name = req.body.name
  newUser.email = req.body.email
  newUser.password = hashPassword


  try{

    const user = newUser.save()
    res.send(user)
    console.log(user);

  } catch (error) {
    res.status(400).send(400)
  }
})

//2. viet api login 
// - validate
// - check email co dung khong
// - check pass co dung khong
// - tao ra jwt gan vao header tra ve cho token

router.post('/login', async (req, res) => {
  // validate
  const {error} = loginValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)
  
  //check email
  const userLogin = await userModel.findOne({email: req.body.email})
  if(!userLogin) return res.status(400).send('User not exist')

  //check pass
  const ispasswordLogin = await bcrypt.compare(req.body.password, userLogin.password)
  if(!ispasswordLogin) return res.status(400).send('Pass incorrect')

  //create jwt
  const token = jwt.sign({_id: userLogin._id}, 'ma-so-bi-mat')

  //take token to header and return client
  res.header('auth-token', token).send(token)
  console.log(token);
})

//check token co work khong
// - viet api tra ve hello world
// - neu api gan token dc tra ve tu api login -> tra ve hw
// - neu api k gan token -> tra ve ban k co quyen truy cap
// neu api gan token nhung token kp token dc tra ve tu api login -> k the truy cap
router.get('/', authMiddleware, (req, res) => {
  res.send('Hello world')
})

module.exports = router;
