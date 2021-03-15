const appRoot = require('app-root-path');
const log = require(appRoot + '/configs/winston').getLogger();
var MainService = require(appRoot + '/services/mainService');
var service = new MainService();
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

class MainController {

  countPoints(req, res, next) {
      try {
        log.info("START");
        service.initialize(req.app.locals.db);
        service.countPoints(req.session.email)
          .then(result => {
            if(result) {
              res.status(200).send(result)
            } else {
              res.status(200).send({code:401,message:'Errore interno'})
            }
          })
          .catch(e => {
            log.error(e);
            res.status(200).send({code:401,message:e.message});
          })
      } catch (e) {
        log.error(e);
        next(e.message);
      } finally {
        log.info("FINISH");
      }
  }

  countUsers(req, res, next) {
      try {
        log.info("START");
        service.initialize(req.app.locals.db);
        service.countUsers()
          .then(result => {
            if(result) {
              res.status(200).send(result)
            } else {
              res.status(200).send({code:401,message:'Errore interno'})
            }
          })
          .catch(e => {
            log.error(e);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        log.error(e);
        next(e.message);
      } finally {
        log.info("FINISH");
      }
  }

  getUser(req, res, next) {
      try {
        log.info("START");
        let email = req.body.email ? req.body.email : req.session.email;
        service.initialize(req.app.locals.db);
        service.getUser(email)
          .then(result => {
            if(result) {
              res.status(200).send(result)
            } else {
              res.status(200).send({code:401,message:'Utente inesistente'})
            }
          })
          .catch(e => {
            log.error(e);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        log.error(e);
        next(e.message);
      } finally {
        log.info("FINISH");
      }
  }

  loginUser(req, res, next) {
      try {
        log.info("START");
        service.initialize(req.app.locals.db);
        service.loginUser(req.body)
          .then(result => {
            if(result.code === 200){
              let secret = uuid();
              req.session.secret = secret;
              req.session.email = req.body.email;
              req.session.type = result.type;
              let token = jwt.sign({email:req.body.email}, secret, {expiresIn: '1h'});
              res.cookie('token', token, {httpOnly: true}).status(200).send(result)
            } else {
              res.status(200).send({code:result.code, message:result.message});
            }
          })
          .catch(e => {
            log.error(e);
            next(e.message);
          })
      } catch (e) {
        log.error(e);
        next(e.message);
      } finally {
        log.info("FINISH");
      }
  }

  saveUser(req, res, next) {
      try {
        log.info("START");
        service.initialize(req.app.locals.db);
        service.saveUser(req.body)
          .then(result => {
            res.locals.result = result;
            next();
          })
          .catch(e => {
            log.error(e);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        log.info("main_Controller - [saveUser] - ERROR -", e.message);
        next(e.message);
      } finally {
        log.info("FINISH");
      }
  }

  activeUser(req, res, next) {
    try {
      log.info("START");
      service.initialize(req.app.locals.db);
      service.activeUser({activeToken:req.params.activeToken})
      .then(result => {
        if(result) {
          res.sendFile(appRoot + '/resources/templateActivationSuccess.html');
        } else {
          res.sendFile(appRoot + '/resources/templateActivationFail.html');
        }
      })
      .catch(err => {
        log.error(err);
        next(err.message)
      })
    } catch (e) {
      log.error(e);
      next(e.message);
    } finally {
      log.info("FINISH");
    }
  }

  deleteUser(req, res, next) {
    try {
      log.info("START");
      service.initialize(req.app.locals.db);
      service
      .deleteUser({email: req.body.email ? req.body.email : req.session.email})
      .then(result => {
        res.status(200).send(result)
      })
      .catch(err => {
        res.status(200).send(err)
      })
    } catch (e) {
      log.error(e);
      next(e.message);
    } finally {
      log.info("FINISH");
    }
  }

  saveClick(req, res, next) {
      try {
        log.info("START");
        service.initialize(req.app.locals.db);
        service.saveClick(req.session.email, req.body.url)
          .then(result => {
            if(result.code === 401) {
              log.info(result.message);
              res.status(200).send({code:401});
            } else {
              res.status(200).send(result)
            }
          })
          .catch(e => {
            log.error(e);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        log.error(e);
        next(e.message);
      } finally {
        log.info("FINISH");
      }
  }

  getAdmin(req, res, next) {
      try {
        log.info("START");
        let email = req.body.email ? req.body.email : req.session.email;
        service.initialize(req.app.locals.db);
        service.getAdmin(email)
          .then(result => {
            if(result) {
              res.status(200).send(result)
            } else {
              if(req.session.type === 'Client') {
                res.status(200).send({code:200,type:req.session.type})
              } else {
                res.status(200).send(result)
              }
            }
          })
          .catch(e => {
            log.error(e);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        log.error(e);
        next(e.message);
      } finally {
        log.info("FINISH");
      }
  }

  getAdmins(req, res, next) {
      try {
        log.info("START");
        let type = req.body.type ? req.body.type : null;
        service.initialize(req.app.locals.db);
        service.getAdmins(type)
          .then(result => {
            res.status(200).send(result)
          })
          .catch(e => {
            log.error(e);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        log.error(e);
        next(e.message);
      } finally {
        log.info("FINISH");
      }
  }

  addAdmin(req, res, next) {
      try {
        log.info("START");
        service.initialize(req.app.locals.db);
        service.addAdmin(req.body)
          .then(result => {
            res.status(200).send(result)
          })
          .catch(e => {
            log.error(e);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        log.error(e);
        next(e.message);
      } finally {
        log.info("FINISH");
      }
  }

  deleteAdmin(req, res, next) {
    try {
      log.info("START");
      service.initialize(req.app.locals.db);
      service
      .deleteAdmin({email: req.body.email})
      .then(result => {
        res.status(200).send(result)
      })
      .catch(err => {
        res.status(200).send(err)
      })
    } catch (e) {
      log.error(e);
      next(e.message);
    } finally {
      log.info("FINISH");
    }
  }

  login(req, res, next) {
      try {
        log.info("START");
        service.initialize(req.app.locals.db);
        service.login(req.body)
          .then(result => {
            if(result.code === 200){
              let secret = uuid();
              req.session.secret = secret;
              req.session.email = req.body.email;
              req.session.type = result.type;
              let token = jwt.sign({email:req.body.email}, secret, {expiresIn: '1h'});
              res.cookie('token', token, {httpOnly: true}).status(200).send(result)
            } else {
              res.status(200).send({code:result.code, message:result.message});
            }
          })
          .catch(e => {
            log.error(e);
            next(e.message);
          })
      } catch (e) {
        log.error(e);
        next(e.message);
      } finally {
        log.info("FINISH");
      }
    }

  verifyPassword(req, res, next) {
    try {
      log.info("START");
      service.initialize(req.app.locals.db);
      service
      .verifyPassword({email: req.session.email, password: req.body.password})
      .then(result => {
        res.status(200).send(result)
      })
      .catch(err => {
        res.status(200).send(err)
      })
    } catch (e) {
      log.error(e);
      next(e.message);
    } finally {
      log.info("FINISH");
    }
  }

  getClientsPixels(req, res, next) {
    try {
      log.info("START");
      service.initialize(req.app.locals.db);
      service.getClientsPixels_V2(req.session.email, req.session.type)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        log.error(err);
        next(err);
      })
    } catch (e) {
      log.error(e);
      next(e.message);
    } finally {
      log.info("FINISH");
    }
  }

  getClient(req, res, next) {
    try {
      log.info("START");
      service.initialize(req.app.locals.db);
      service.getClient(req.body)
      .then(result => {
        if(result) {
          res.status(200).send({code:200, item:result});
        } else {
          res.status(200).send({code:404, message:'Client not found'})
        }
      })
      .catch(err => {
        log.error(err);
        next(err.message);
      })
    } catch (e) {
      log.error(e);
      next(e.message);
    } finally {
      log.info("FINISH");
    }
  }

  editClient(req, res, next) {
    try {
      log.info("START");
      service.initialize(req.app.locals.db);
      service.editClient(req.body)
      .then(result => {
        if(result) {
          service.createCanvas()
          .then(result1 => {
            res.status(200).send({code:200, message:result});
          })
          .catch(err => {
            log.error(err);
            next(err);
          })
        } else {
          res.status(200).send({code:404, message:"Non è stato possobile modificare i dati del cliente"});
        }
      })
      .catch(err => {
        log.error(err);
        next(err);
      })
    } catch (e) {
      log.error(e);
      next(e.message);
    } finally {
      log.info("FINISH");
    }
  }

  saveClient(req, res, next) {
    try {
      log.info("START");
      service.initialize(req.app.locals.db);
      service.saveClient(req.body)
      .then(result => {
        service.createCanvas()
        .then(result1 => {
          res.status(200).send(result);
        })
        .catch(err => {
          log.error(err);
          next(err);
        })
      })
      .catch(err => {
        log.error(err);
        next(err);
      })
    } catch (e) {
      log.error(e);
      next(e.message);
    } finally {
      log.info("FINISH");
    }
  }

  getClientsFiltered(req, res, next) {
    try {
      log.info("START");
      service.initialize(req.app.locals.db);
      service.getClientsFiltered(req.body)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        log.error(err);
        res.status(500).send(err);
      })
    } catch (e) {
      log.error(e);
      next(e.message);
    } finally {
      log.info("FINISH");
    }
  }

  deleteClient(req, res, next) {
    try {
      log.info("START");
      service.initialize(req.app.locals.db);
      service
      .deleteClient(req.body)
      .then(result => {
        service.createCanvas()
        .then(result1 => {
          res.status(200).send(result)
        })
        .catch(err => {
          log.error(err);
          next(err);
        })
      })
      .catch(err => {
        res.status(200).send(err)
      })
    } catch (e) {
      log.error(e);
      next(e.message);
    } finally {
      log.info("FINISH");
    }
  }

  countPixels(req, res, next) {
    try {
      log.info("START");
      service.initialize(req.app.locals.db);
      service
      .countPixels()
      .then(result => {
        res.status(200).send(""+result)
      })
      .catch(err => {
        res.status(200).send(err)
      })
    } catch (e) {
      log.error(e);
      next(e.message);
    } finally {
      log.info("FINISH");
    }
  }

  resetPassword(req, res, next) {
    try {
      log.info("START");
      service.initialize(req.app.locals.db);
      service.resetPassword(req.body)
      .then(result => {
        if(!result) {
          throw new Error(result);
        }
        if(result.code === 404){
          res.status(200).send({code: result.code, message:result.message});
        } else{
          req.session.password = result;
          req.session.email = req.body.email;
          /*
          * non avendo sessione quando eseguo questo servizio, devo fare la save su session per forzare il salvataggio
          * dei dati in sessione e richiamarli in un altro end point. Si poteva evitare in questo modo:
          * strutturando l'endpoint a richiamare i due controller
          * nel primo salvare i dati in res.locals
          * eseguire la next() per andare al secondo controller
          * richiamare i dati da res.locals nel secondo controllers
          * (vedi saveUser)
          */
          req.session.save(function(err) {
            if(err) {
              log.error(err);
            } else {
              res.redirect('/api/sendMailResetPassword');
            }
          });
        }
      })
      .catch(err => {
        log.error(err);
        next(err.message);
      })
    } catch (e) {
      log.error(e);
      next(e.message);
    } finally{
      log.info("FINISH");
    }
  }

  changePassword(req, res, next) {
    try {
      log.info("START");
      service.initialize(req.app.locals.db);
      service
      .changePassword({body:req.body, email:req.session.email})
      .then(result => {
        res.status(200).send({code:200,message:"Il cambio password è avvenuto correttamente"})
      })
      .catch(err => {
        log.error(err);
        next(err.message);
      })
    } catch (e) {
      log.error(e);
      next(e.message);
    } finally {
      log.info("FINISH");
    }
  }
}

module.exports = new MainController();
