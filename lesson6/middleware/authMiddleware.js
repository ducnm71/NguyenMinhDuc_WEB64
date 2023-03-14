const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('ban k co quyen truy cap')

    try{
        const checkToken = jwt.verify(token, 'ma-so-bi-mat')
        req.user = checkToken
        next()
    } catch(e) {
        res.status(400).send('Token incorrect')
    }
}