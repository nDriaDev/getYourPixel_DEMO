const appRoot = require('app-root-path');
const log = require(appRoot + '/configs/winston').getLogger();
const jwt = require('jsonwebtoken');

const withAuth = function(req, res, next) {
  log.info("START");
  const token = req.cookies.token;
  if (!token) {
    log.error(new Error("Token is not exist"));
    res.status(200).send({code:401,message:'Non autorizzato: nessun token fornito'});
  } else {
    var secret = req.session.secret;
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        log.error("Session Expired");
        res.status(200).send({code:401,message:'Sessione scaduta'});
      } else {
        req.email = decoded.email;
        log.info("START");
        next();
      }
    });
  }
}
module.exports = withAuth;
