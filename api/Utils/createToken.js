const jwt = require('jsonwebtoken')

const jwtSecret = require('./secret')

module.exports = (user) => {
    const payload = {
        subject: user.id,
        username: user.username
      }
      const options = {
        expiresIn: '8h'
      }
    
      const secret = jwtSecret.secret
    
      return jwt.sign(payload, secret, options)
}