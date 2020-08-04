const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.body.token

    jwt.verify(authHeader, authConfig.secret, (err, decoded) => {
        if (err) return res.send().status(401)

        return next()
    })
}