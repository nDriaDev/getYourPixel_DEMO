const express = require('express');
const session = require('express-session');
var FileStore = require('session-file-store')(session);
const { v4: uuid } = require('uuid');
const path = require("path");
const favicon = require('express-favicon');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const apiRoutes = require('./apiRoutes');
const indexRoute = require('./indexRoute');
var ForceSsl = require('./ssl');
ForceSsl = new ForceSsl();
const port = process.env.PORT || 3000;

const server = express();

//creo sessione per express-session
var sess = {
  store: new FileStore({reapInterval: 60*31}),
  resave: true,
  unset: 'destroy',
  saveUninitialized: false,
  secret: uuid(),
  cookie: {},
  genid: (req) => {
    return uuid()
  }
}

if (ForceSsl.getEnv() === 'production') {
  console.log = function () {};
  server.use(ForceSsl.forceSsl);
  server.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true
  sess.store = new FileStore({logFn: function(){}, reapInterval: 60*31});
}

server.use(cookieParser(sess.secret));
server.use(session(sess));

server.use(compression());
server.use(express.json());

// the __dirname is the current directory from where the script is running
server.use(favicon(__dirname + '/build/favicon.ico'));
server.use(express.static(path.join(__dirname, 'build')));

//helmet for protection against XSS clicjacking using X-Frame-Options X-Powered-By ecc
server.use(helmet.dnsPrefetchControl());
server.use(helmet.expectCt());
server.use(helmet.frameguard());
server.use(helmet.hidePoweredBy());
server.use(helmet.hsts());
server.use(helmet.ieNoOpen());
server.use(helmet.noSniff());
server.use(helmet.permittedCrossDomainPolicies());
server.use(helmet.referrerPolicy());
server.use(helmet.xssFilter());

server.use('/api', apiRoutes);

server.use(indexRoute);

server.use((req, res, next) => {
  console.log("server - [GenericErrorHandler] - ERROR");
  let msg = "Endpoint [" + req.url + ',' + req.method + "] not exist";
  next(msg);
});

server.use((err,req,res,next)=>{
  console.log("server - [ErrorHandler] - ERROR -", err);
  res.status(404).send({message: err});
})

server.listen(port,()=>{
  console.log("Server running on port: ", port);
});
