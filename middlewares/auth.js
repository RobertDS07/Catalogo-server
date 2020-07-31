const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.body.token
    console.log(req.body.token);
    jwt.verify(authHeader, authConfig.secret, (err, decoded) => {
        if (err) return res.redirect('http://localhost:3000')

        req.userId = decoded.id

        return next()
    })
}