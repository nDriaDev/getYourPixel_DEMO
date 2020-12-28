const jwt = require('jsonwebtoken');
var secret = process.env.SECRET_KEY ?
  process.env.SECRET_KEY
  :
  '6151addb-2735-4bd5-bdf4-b2b3d51c7860'

const withAuth = function(req, res, next) {
  console.log("authMiddleware - [withAuth] - START");
  const token = req.cookies.token;
  if (!token) {
    console.log("authMiddleware - [withAuth] - ERROR: Token is not exist");
    res.status(200).send({code:401,message:'Unauthorized: No token provided'});
  } else {
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
