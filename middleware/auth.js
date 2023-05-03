const jwt = require('jsonwebtoken');
require('dotenv').config()

SECRET = process.env.SECRET
const Auth = {
    verifyToken(req, res, next){
      const bearerHeader = req.headers['authorization'];
      if(!bearerHeader) return res.status(403).send({
        message :'Header required, token is required'
      })
      let bearer = bearerHeader.split(' ')
      token = bearer[1]
      if (token) {
          jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
              console.log(err.message);
              res.status(403).send({
                message : `Failed to enter this session, ${err.message} and please try relogin`
              });
            } else {
              console.log('Autentikasi berhasil');
              req.id = decodedToken.id_user
              req.email = decodedToken.email 
              req.role = decodedToken.role
              return next()
            }
          });
      } else {
        res.status(403).send({
          message :'Youre not authenticated, please login first'
        })
        console.log('Youre not authenticated');
      }
    
  }, 
  verifyTokenAdmin(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(!bearerHeader) return res.status(403).send({
      message :'Header required, token is required'
    })
    let bearer = bearerHeader.split(' ')
    token = bearer[1]
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
          if (err) {
            console.log(err.message);
            res.status(403).send({
              message : `Failed to enter this session, ${err.message} and please try relogin`
            });
          } else {
            console.log('Autentikasi berhasil');
            req.id = decodedToken.id_user
            req.email = decodedToken.email 
            req.role = decodedToken.role
            if(req.role !== 'admin') return res.status(403).send({
              message: 'Cannot access admin routes',
            })
            return next()
          }
        });
    } else {
      res.status(403).send({
        message :'Youre not authenticated, please login first'
      })
      console.log('Youre not authenticated');
    }
  
}
}

module.exports = Auth;