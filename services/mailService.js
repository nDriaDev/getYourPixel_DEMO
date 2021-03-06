var nodemailer = require('nodemailer');
var { google } = require("googleapis");
var { OAuth2 } = google.auth;
var fs = require('fs');
var handlebars = require('handlebars');
const appRoot = require('app-root-path');
const log = require(appRoot + '/configs/winston').getLogger();

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_CLIENT_REFRESH_TOKEN,
  MAILING_SERVICE_SENDER_EMAIL_ADDRESS,
  MAILING_SERVICE_OAUTH_PLAYGROUND,
}
=
process.env;

const oauth2Client = new OAuth2(
     MAILING_SERVICE_CLIENT_ID, // ClientID
     MAILING_SERVICE_CLIENT_SECRET, // Client Secret
     MAILING_SERVICE_OAUTH_PLAYGROUND // Redirect URL
);

const setOptionsTrasporter = () => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_CLIENT_REFRESH_TOKEN
  });

  return {
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: MAILING_SERVICE_SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_CLIENT_REFRESH_TOKEN,
      accessToken: oauth2Client.getAccessToken()
    }
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
  log.info("START");
  readTemplate('./templateEmail.html',(err, html) => {
    let transporter = nodemailer.createTransport(setOptionsTrasporter());
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
        from: MAILING_SERVICE_SENDER_EMAIL_ADDRESS,
        to: 'info@getyourpixels.com',
        subject: 'Get Your Pixels Contacting',
        html: htmlToSend
      }

      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          log.error(err);
          callback(err, null);
        } else {
          callback(null, data);
        }
      })
    } catch (e) {
      log.error(e);
      throw e;
    } finally {
      transporter.close();
      log.info("FINISH");
    }
  })
}

exports.sendMailResetPassword = (params, callback) => {
  log.info("START");
  let transporter = nodemailer.createTransport(setOptionsTrasporter());
  try {
    const {
      password,
      email
    } = params;

    let mailOptions = {
      sender: 'Administrator',
      from: MAILING_SERVICE_SENDER_EMAIL_ADDRESS,
      to: email,
      subject: 'Get Your Pixels - reset password',
      text: 'La richiesta di reset password è stata effettuata con successo.\nEcco la tua nuova password:\n\n' + password + '\n\nCambiala il prima possibile!',
    }

    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        log.error(err);
        callback(err, null);
      } else {
        callback(null, data);
      }
    })
  } catch (e) {
    log.error(e);
    throw e;
  } finally {
    transporter.close();
    log.info("FINISH");
  }
}

exports.sendActivationEmail = (host, email, username, activeToken, callback) => {
  log.info("START");
  let protocol = 'http://';
  if(process.env.NODE_ENV === 'production') {
    protocol = 'https://';
  }
  let link = protocol + host + '/api/activeUser/' + activeToken;
  readTemplate('./templateActivationEmail.html',(err, html) => {
    let transporter = nodemailer.createTransport(setOptionsTrasporter());
    try {
      let template = handlebars.compile(html);
      let replace = {
        username: username,
        link: link,
      }
      let htmlToSend = template(replace);
      let mailOptions = {
        from: MAILING_SERVICE_SENDER_EMAIL_ADDRESS,
        to: email,
        subject: 'Get Your Pixels Contacting',
        html: htmlToSend
      }

      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          log.error(err);
          callback(err, null);
        } else {
          callback(null, data);
        }
      })
    } catch (e) {
      log.error(e);
      throw e;
    } finally {
      transporter.close();
      log.info("FINISH");
    }
  })
}


// module.exports = sendMail;
