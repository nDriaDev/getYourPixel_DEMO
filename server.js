const express = require('express');
const path = require("path");
const favicon = require('express-favicon');
var compression = require('compression');
var sendMail = require('./mail');
const port = process.env.PORT || 3000;

const server = express();

server.use(compression());
server.use(express.json());
// the __dirname is the current directory from where the script is running
server.use(favicon(__dirname + '/build/favicon.ico'));
server.use(express.static(path.join(__dirname, 'build')));

server.get('*', (req, res) => {

  if (req.url.indexOf("/external/") === 0 || req.url.indexOf("/css/") === 0 || req.url.indexOf("/media/") === 0
  || req.url.indexOf("/js/") === 0 || req.url.indexOf(".js") === 0 || req.url.indexOf(".css") === 0
  || req.url.indexOf(".map") === 0) {
    res.setHeader("Cache-Control", "public, max-age=2592000");
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
  }

  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.post('/email', (req,res, next)=> {
  // res.json({message:'Message received!'})
  try {
    const {name, email, subject, message} = req.body;

    sendMail(name, email, subject, message, (err, data) =>{
      if(err) {
        res.status(500).send({message: 'Error while sending yur message'})
      } else {
        res.status(200).send({message: 'Your message was sent'})
      }
    })
  } catch (e) {
    console.log(e);
    next(e.message);
  }
})

server.use((err,req,res,next)=>{
  res.status(404).send({message: err});
})

server.listen(port,()=>{
  console.log("Server running on port: ", port);
});
