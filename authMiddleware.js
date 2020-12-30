
const jwt = require('jsonwebtoken');

const withAuth = function(req, res, next) {
  console.log("authMiddleware - [withAuth] - START");
  const token = req.cookies.token;
  if (!token) {
    console.log("authMiddleware - [withAuth] - ERROR: Token is not exist");
    res.status(200).send({code:401,message:'Unauthorized: No token provided'});
  } else {
    var secret = req.session.secret;
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        console.log("authMiddleware - [withAuth] - ERROR", err.message);
        res.status(200).send({code:401,message:'Unauthorized: Invalid token'});
      } else {
        console.log("DECODED",decoded);
        req.email = decoded.email;
        console.log("authMiddleware - [withAuth] - FINISH");
        next();
      }
    });
  }
}
module.exports = withAuth;
