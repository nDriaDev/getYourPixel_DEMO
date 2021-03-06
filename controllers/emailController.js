const appRoot = require('app-root-path');
const log = require(appRoot + '/configs/winston').getLogger();
var mailer = require(appRoot + '/services/mailService');


class Mailer {
  sendMail(req, res, next) {
    try {
      log.info("START");
      const {
        name,
        email,
        subject,
        message
      } = req.body;

      mailer.sendMail(name, email, subject, message, (err, data) => {
        if (err) {
          log.error(err);
          res.status(500).send({
            message: 'Error while sending yur message'
          })
        } else {
          res.status(200).send({
            message: 'Your message was sent'
          })
        }
      })
    } catch (e) {
      log.error(e);
      next(e.message);
    } finally {
      log.info("FINISH");
    }
  }

  sendMailResetPassword(req, res, next) {
    try {
      log.info("START");
      let password = req.session.password;
      let email = req.session.email;
      req.session.email = null;
      req.session.password = null;
      req.session.save((err) => {
        if (err) {
          log.error(err);
        } else {
          mailer.sendMailResetPassword({
            password: password,
            email: email
          }, (err, data) => {
            if (err) {
              log.error(err);
              res.status(200).send({
                code: 500,
                message: 'Error while sending reset password email'
              })
            } else {
              res.status(200).send({
                code: 200,
                message: "La nuova password e' stata inviata via email"
              })
            }
          })
        }
      });
    } catch (e) {
      log.error(e);
      next(e.message);
    } finally {
      log.info("FINISH");
    }
  }

  sendActivationEmail(req, res, next) {
    try {
      log.info("START");
      let email = res.locals.result.email;
      let activeToken = res.locals.result.activeToken;
      let message = res.locals.result.message;
      let username = res.locals.result.username;
      delete res.locals.result;
      mailer.sendActivationEmail(
        req.headers.host,
        email,
        username,
        activeToken,
        (err, data) => {
        if (err) {
          log.error(err);
          res.status(200).send({
            code: 500,
            message: 'Error while sending email with activation link'
          })
        } else {
          res.status(200).send({
            code: 200,
            message: message
          })
        }
      })
    } catch (e) {
      log.error(e);
      next(e.message);
    } finally {
      log.info("FINISH");
    }
  }

}

module.exports = new Mailer();
