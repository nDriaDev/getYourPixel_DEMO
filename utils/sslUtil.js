class ForceSSL{
  forceSsl = function(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
  };
  getEnv(){
    return process.env.NODE_ENV || 'development';
  }

}

module.exports=ForceSSL;
