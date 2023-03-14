const UserController = require('./controllers/users.controller')
const { registerValidate, loginValidate } = require('./middleware/validation')
const authMiddleware = require('./middleware/authMiddleware')

exports.routesConfig = (app) => {
    app.post('/auth/register', [
        registerValidate,
        UserController.register
    ])

    app.post('/auth/login', [
        loginValidate,
        UserController.login
    ])
    
    app.get('/auth/list', [
        authMiddleware,
        UserController.list
    ])

    app.delete('/auth/delete', [
        UserController.delete
    ])
}
