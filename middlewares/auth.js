const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

// middleware para verificar se a requisição vem do admin 
module.exports = (req, res, next) => {
    // pegando o token da requisição 
    const authHeader = req.body.token

    // verificando o token, junto com a secret (sem a secret não vai obviamente)
    jwt.verify(authHeader, authConfig.secret, (err, decoded) => {
        if (err) return res.send(401)

        return next()
    })
}