var mailer = require('../mail');


class Mailer {
  sendMail(req, res, next) {
    try {
      console.log("mailer_Controller - [sendMail] - START");
      const {name, email, subject, message} = req.body;

      mailer.sendMail(name, email, subject, message, (err, data) =>{
        if(err) {
          console.log("mailer_Controller - [sendMail] - ERROR", err.message);
          res.status(500).send({message: 'Error while sending yur message'})
        } else {
          res.status(200).send({message: 'Your message was sent'})
        }
      })
    } catch (e) {
      console.log("mailer_Controller - [sendMail] - ERROR", e.message);
      next(e.message);
    } finally {
      console.log("mailer_Controller - [sendMail] - FINISH");
    }
  }

  sendMailResetPassword(req, res, next) {
    try {
      console.log("mailer_Controller - [sendMailResetPassword] - START");
      const {password} = req.query;
      mailer.sendMailResetPassword(password, (err, data) =>{
        if(err) {
          console.log("mailer_Controller - [sendMailResetPassword] - ERROR", err.message);
          res.status(500).send({message: 'Error while sending reset password email'})
        } else {
          res.status(200).send({message: "La nuova password e' stata inviata via email"})
        }
      })
    } catch (e) {
      console.log("mailer_Controller - [sendMailResetPassword] - ERROR", e.message);
      next(e.message);
    } finally {
      console.log("mailer_Controller - [sendMailResetPassword] - FINISH");
    }
  }
}

module.exports = new Mailer();
