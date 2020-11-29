var nodemailer = require('nodemailer');
var mailGun = require('nodemailer-mailgun-transport');
var fs = require('fs');
var handlebars = require('handlebars');

var auth = {
  auth:{
    api_key:process.env.MAILGUN_API_KEY ? process.env.MAILGUN_API_KEY : '<your API KEY>',
    domain:process.env.MAILGUN_DOMAIN ? process.env.MAILGUN_DOMAIN : '<your domain>',
  }
}

var readTemplate = (callback) => {
  fs.readFile('./templateEmail.html', {encoding: 'utf-8'}, (err,html)=>{
    if(err){
      throw err;
      callback(err);
    } else {
      callback(null, html);
    }
  })
}

var transporter = nodemailer.createTransport(mailGun(auth));

var sendMail = (name, email, subject, message, callback) => {
  try {
    readTemplate((err,html)=>{
      let template = handlebars.compile(html);
      let replace = {
        name: name,
        subject: subject,
        message: message,
        email: email
      }
      let htmlToSend = template(replace);
      let mailOptions = {
        sender: name,
        from: email,
        to: '<where send email>',
        // to: 'info@getyourpixels.com',
        subject: 'Get Your Pixels Contacting',
        html: htmlToSend
      }

      transporter.sendMail(mailOptions, function(err,data) {
        if(err){
          callback(err, null);
        } else {
          callback(null, data);
        }
      })

    })
  } catch (e) {
    console.log(e);
  }

}

module.exports = sendMail;
