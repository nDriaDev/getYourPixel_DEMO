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
            message: "Error durante l'invio del messaggio"
          })
        } else {
          res.status(200).send({
            message: "Il messaggio e' stato inviato correttamente"
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
                message: "Errore durante l'invio della email di reset password"
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
            message: "Errore durante l'invio della email con il link di attivazione"
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
