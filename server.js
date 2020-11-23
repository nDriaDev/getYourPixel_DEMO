const express = require('express');
const path = require("path");
const favicon = require('express-favicon');
var compression = require('compression');
const mailgun = require('mailgun-js');
const DOMAIN = 'sandbox7acb09b2b39b457eb0efff367779ea73.mailgun.org';
const mg = mailgun({apiKey: "5c980a4ec04f4a2ba5c9a0395d31204d-2af183ba-248d847e", domain: DOMAIN});

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

  res.sendFile(path.join(__dirname, 'build', 'public/error.html'));
});

server.post('/sendMail', (req, res, next)=> {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  const data = {
    from: 'app191618745@heroku.com',
    to: email, ,
    subject: "Get Your Pixel Contacting",
    text:
    '<!DOCTYPE html>' +
    + '<html  style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">' +
    + '<head>' +
    + '<meta name="viewport" content="width=device-width" />' +
    + '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
    + '<title>Alerts e.g. approaching your limit</title>' +
    + '<style type="text/css">' +
    + 'img {' +
    + 'max-width: 100%;' +
    + '}' +
    + 'body {' +
    + '-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;' +
    + '}' +
    + 'body {' +
    + 'background-color: #f6f6f6;' +
    + '}' +
    + '@media only screen and (max-width: 640px) {' +
    +  'body {' +
    +  'padding: 0 !important;' +
    +  '}' +
    +  'h1 {' +
    +  'font-weight: 800 !important; margin: 20px 0 5px !important;' +
    + '}' +
    + '  h2 {' +
    +   'font-weight: 800 !important; margin: 20px 0 5px !important;' +
    + '}' +
    + '  h3 {' +
    +   'font-weight: 800 !important; margin: 20px 0 5px !important;' +
    + '}' +
    + '  h4 {' +
    +   'font-weight: 800 !important; margin: 20px 0 5px !important;' +
    + '}' +
    + '  h1 {' +
    + 'font-size: 22px !important;' +
    + '}' +
    + '  h2 {' +
    + 'font-size: 18px !important;' +
    + '}' +
    + '  h3 {' +
    + 'font-size: 16px !important;' +
    + '}' +
    +  '.container {' +
    + 'padding: 0 !important; width: 100% !important;' +
    + '}' +
    + '.content {' +
    + 'padding: 0 !important;' +
    + '}' +
    + '.content-wrap {' +
    + 'padding: 10px !important;' +
    + '}' +
    +  '.invoice {' +
    + 'width: 100% !important;'
    + '}' +
    + '}' +
    + '</style>' +
    + '</head>' +
    + '<body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">' +
    + '<table class="body-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>' +
    +   '<td class="container" width="600" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">' +
    +     '<div class="content" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">' +
    +       '<table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="alert alert-warning" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; border-radius: 3px 3px 0 0; background-color: #FF9F00; margin: 0; padding: 20px;" align="center" bgcolor="#FF9F00" valign="top">' +
    +              'Hai ricevuto una richiesta di informazioni da' +
    +            '</td>' +
    +          '</tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">' +
    +             '<table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top" align="center">' +
    +                   '<strong style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">' + email + '</strong>' +
    +                  '</td>' +
    +                '</tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">' +
    +                    'Questo è il messaggio' +
    +                  '</td>' +
    +                '</tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">' +
    +                    'Soggetto: ' + subject +
    +                  '</td>' +
    +                '</tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">' +
    +                    'Messaggio: ' + text +
    +                  '</td>' +
    +                '</tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">' +
    +                    '<a href="mailto:"' + email + 'class="btn-primary" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda; border-style: solid; border-width: 10px 20px;">Rispondi</a>' +
    +                  '</td>' +
    +                '</tr></table></td>' +
    +          '</tr></table><div class="footer" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">' +
    +          '<table width="100%" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="aligncenter content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; color: #999; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top"><a href="http://www.mailgun.com" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; color: #999; text-decoration: underline; margin: 0;">Unsubscribe</a> from these alerts.</td>' +
    +            '</tr></table></div></div>' +
    +    '</td>'
    +    '<td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>' +
    +  '</tr></table></body>' +
    + '</html>',
  };

  mg.messages().send(data, function (error, body) {
    if(error){
      res.status(200).send({error:error});
    }
    console.log(body);
    res.status(200).send({msg:"success"})
  });
})

app.use((req,res,next)=>{
  let error = New Error("errore nel server");
  next(err);
})

app.use((err,req,res,next)=>{
  res.status(200).send(err);
})

server.listen(port,()=>{
  console.log("Server running on port: ", port);
});
