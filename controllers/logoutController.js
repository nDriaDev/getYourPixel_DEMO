const appRoot = require('app-root-path');
const log = require(appRoot + '/configs/winston').getLogger();

module.exports = (req, res, next) => {
  log.info("START");
  // delete req.session.password;
  // delete req.session.secret;
  // delete req.session.email;
  // delete req.cookies.token;
  // res.status(202).send({code: 200, message: 'logout avvenuto con successo'})
  req.session.destroy(function(err) {
    if(err) {
      log.error(err);
    } else {
      //req.app accede all'oggetto express() : col metodo get('nome') si ha il valore della proprieta 'nome' settata in precedenza (vedi server.js riga 44)
      res.clearCookie(req.app.get('sessionName'));
      res.status(202).send({code: 200, message: 'logout avvenuto con successo'})
    }
  })
  // req.session.destroy(function(err) {
  //     if(err) {
  //       log.info("Logout_controller [logout] ERROR -",err.message);
  //       res.status(202).send({code: 500, message: err.message})
  //     } else {
  //       res.status(202).send({code: 200, message: 'logout avvenuto con successo'})
  //     }
  // });
  log.info("FINISH");
};
