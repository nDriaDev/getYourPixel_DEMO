const express = require('express');
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

if (process.env.NODE_ENV === 'production') {
    console.log = function () {};
}

if (ForceSsl.getEnv() === 'production') {
    server.use(ForceSsl.forceSsl);
}
server.use(cookieParser());
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
