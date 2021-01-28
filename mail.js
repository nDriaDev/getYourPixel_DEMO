var nodemailer = require('nodemailer');
var fs = require('fs');
var handlebars = require('handlebars');

var opts = {
  service: 'gmail',
  auth: {
    //Check use secure less app gmail account
    user: '<insert email gmail here>',
    pass: '<insert password gmail here>',
  }
}

var readTemplate = (path, callback) => {
  fs.readFile(path, {
    encoding: 'utf-8'
  }, (err, html) => {
    if (err) {
      callback(err);
    } else {
      callback(null, html);
    }
  })
}


exports.sendMail = (name, email, subject, message, callback) => {
  console.log("mailer - [sendMail] - START");
  readTemplate('./templateEmail.html',(err, html) => {
    let transporter = nodemailer.createTransport(opts);
    try {
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
        from: 'info@getyourpixels.com',
        // to: '<where send email>',
        to: 'info@getyourpixels.com',
        subject: 'Get Your Pixels Contacting',
        html: htmlToSend
      }

      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("mailer - [sendMail] - ERROR", err.message);
          callback(err, null);
        } else {
          callback(null, data);
        }
      })
    } catch (e) {
      console.log("mailer - [sendMail] - ERROR", e.message);
      throw e;
    } finally {
      transporter.close();
      console.log("mailer - [sendMail] - FINISH");
    }
  })
}

exports.sendMailResetPassword = (params, callback) => {
  console.log("mailer - [sendMailResetPassword] - START");
  let transporter = nodemailer.createTransport(opts);
  try {
    const {
      password,
      email
    } = params;

    let mailOptions = {
      sender: 'Administrator',
      from: 'info@getyourpixels.com',
      to: email,
      subject: 'Get Your Pixels - reset password',
      text: 'La richiesta di reset password è stata effettuata con successo.\nEcco la tua nuova password:\n\n' + password + '\n\nCambiala il prima possibile!',
    }

    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("mailer - [sendMailResetPassword] - ERROR", err.message);
        callback(err, null);
      } else {
        callback(null, data);
      }
    })
  } catch (e) {
    console.log("mailer - [sendMailResetPassword] - ERROR", e.message);
    throw e;
  } finally {
    transporter.close();
    console.log("mailer - [sendMailResetPassword] - FINISH");
  }
}

exports.sendActivationEmail = (host, email, username, activeToken, callback) => {
  console.log("mailer - [sendActivationEmail] - START");
  let link = 'http://' + host + '/api/activeClient/' + activeToken;
  readTemplate('./templateActivationEmail.html',(err, html) => {
    let transporter = nodemailer.createTransport(opts);
    try {
      let template = handlebars.compile(html);
      let replace = {
        username: username,
        link: link,
      }
      let htmlToSend = template(replace);
      let mailOptions = {
        from: 'info@getyourpixels.com',
        // to: '<where send email>',
        to: email,
        subject: 'Get Your Pixels Contacting',
        html: htmlToSend
      }

      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("mailer - [sendActivationEmail] - ERROR", err.message);
          callback(err, null);
        } else {
          callback(null, data);
        }
      })
    } catch (e) {
      console.log("mailer - [sendActivationEmail] - ERROR", e.message);
      throw e;
    } finally {
      transporter.close();
      console.log("mailer - [sendActivationEmail] - FINISH");
    }
  })
}


// module.exports = sendMail;
