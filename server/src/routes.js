const AuthenticationController = require('./controllers/AuthenticationController')

module.exports = (app) => {
    app.post('/post', AuthenticationController.post)
}