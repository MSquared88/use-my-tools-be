const jwt = require('jsonwebtoken')

const jwtSecret = require('./secret')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if(token){
      jwt.verify(token, jwtSecret.secret, (err, decodedToken) => {
          if(err){
              res.status(401).json({message: 'invalid credentials'})
          }
          else {
              req.username = decodedToken.username
              req.userid = decodedToken.subject
              next()
          }
      })
  }
  else{
      res.status(400).json({message: 'a authorization token is required in the header'})
  }
};