const express = require('express');
const path = require("path");
const favicon = require('express-favicon');
var compression = require('compression');
const port = process.env.PORT || 3000;

const server = express();

// the __dirname is the current directory from where the script is running
server.use(compression());

server.use(favicon(__dirname + '/build/favicon.ico'));
server.use(express.static(__dirname));
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

server.listen(port,()=>{
  console.log("Server running on port: ", port);
});
