const authenticationMiddleware = (req, res, next) => {
    const userName = req.body.username
    const password = req.body.password
  
    if(userName==='admin' && password==='admin') {
      next()
    } else{
      res.status(401).send('Username or password is incorrect!')
    }
  }

  module.exports = authenticationMiddleware