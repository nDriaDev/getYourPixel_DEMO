var MainService = require('../mainService');
var service = new MainService();
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

class MainController {

  getUser(req, res, next) {
      try {
        console.log("main_Controller - [getUser] - START");
        let email = req.body.email ? req.body.email : req.session.email;
        service.initialize(req.app.locals.db);
        service.getUser(email)
          .then(result => {
            res.status(200).send(result)
          })
          .catch(e => {
            console.log("main_Controller - [getUser] - ERROR -", e.message);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        console.log("main_Controller - [getUser] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("main_Controller - [getUser] - FINISH");
      }
  }

  loginUser(req, res, next) {
      try {
        console.log("main_Controller - [loginUser] - START");
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
            console.log("main_Controller - [loginUser] - ERROR -", e.message);
            next(e.message);
          })
      } catch (e) {
        console.log("main_Controller - [loginUser] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("main_Controller - [loginUser] - FINISH");
      }
  }

  saveUser(req, res, next) {
      try {
        console.log("main_Controller - [saveUser] - START");
        service.initialize(req.app.locals.db);
        service.saveUser(req.body)
          .then(result => {
            res.locals.result = result;
            next();
          })
          .catch(e => {
            console.log("main_Controller - [saveUser] - ERROR -", e.message);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        console.log("main_Controller - [saveUser] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("main_Controller - [saveUser] - FINISH");
      }
  }

  activeUser(req, res, next) {
    try {
      console.log("main_Controller - [activeUser] - START");
      service.initialize(req.app.locals.db);
      service.activeUser({activeToken:req.params.activeToken})
      .then(result => {
        if(result) {
          res.sendFile((require("path")).resolve(__dirname, '..','templateActivationSuccess.html'));
        } else {
          res.sendFile((require("path")).resolve(__dirname, '..','templateActivationFail.html'));
        }
      })
      .catch(err => {
        console.log("main_Controller - [activeUser] - ERROR -", err.message);
        next(err.message)
      })
    } catch (e) {
      console.log("main_Controller - [activeUser] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("main_Controller - [activeUser] - FINISH");
    }
  }

  deleteUser(req, res, next) {
    try {
      console.log("main_Controller - [deleteUser] - START");
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
      console.log("main_Controller - [deleteUser] - ERROR", e.message);
      next(e.message);
    } finally {
      console.log("main_Controller - [deleteUser] - FINISH");
    }
  }

  saveClick(req, res, next) {
      try {
        console.log("main_Controller - [saveClick] - START");
        service.initialize(req.app.locals.db);
        service.saveClick(req.session.email, req.body.url)
          .then(result => {
            res.status(200).send(result)
          })
          .catch(e => {
            console.log("main_Controller - [saveClick] - ERROR -", e.message);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        console.log("main_Controller - [saveClick] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("main_Controller - [saveClick] - FINISH");
      }
  }

  getAdmin(req, res, next) {
      try {
        console.log("main_Controller - [getAdmin] - START");
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
            console.log("main_Controller - [getAdmin] - ERROR -", e.message);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        console.log("main_Controller - [getAdmin] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("main_Controller - [getAdmin] - FINISH");
      }
  }

  getAdmins(req, res, next) {
      try {
        console.log("main_Controller - [getAdmins] - START");
        let type = req.body.type ? req.body.type : null;
        service.initialize(req.app.locals.db);
        service.getAdmins(type)
          .then(result => {
            res.status(200).send(result)
          })
          .catch(e => {
            console.log("main_Controller - [getAdmins] - ERROR -", e.message);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        console.log("main_Controller - [getAdmins] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("main_Controller - [getAdmins] - FINISH");
      }
  }

  addAdmin(req, res, next) {
      try {
        console.log("main_Controller - [addAdmin] - START");
        service.initialize(req.app.locals.db);
        service.addAdmin(req.body)
          .then(result => {
            res.status(200).send(result)
          })
          .catch(e => {
            console.log("main_Controller - [addAdmin] - ERROR -", e.message);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        console.log("main_Controller - [addAdmin] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("main_Controller - [addAdmin] - FINISH");
      }
  }

  deleteAdmin(req, res, next) {
    try {
      console.log("main_Controller - [deleteAdmin] - START");
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
      console.log("main_Controller - [deleteAdmin] - ERROR", e.message);
      next(e.message);
    } finally {
      console.log("main_Controller - [deleteAdmin] - FINISH");
    }
  }

  login(req, res, next) {
      try {
        console.log("main_Controller - [login] - START");
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
            console.log("main_Controller - [login] - ERROR -", e.message);
            next(e.message);
          })
      } catch (e) {
        console.log("main_Controller - [login] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("main_Controller - [login] - FINISH");
      }
    }

  verifyPassword(req, res, next) {
    try {
      console.log("main_Controller - [verifyPassword] - START");
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
      console.log("main_Controller - [verifyPassword] - ERROR", e.message);
      next(e.message);
    } finally {
      console.log("main_Controller - [verifyPassword] - FINISH");
    }
  }

  getClientsPixels(req, res, next) {
    try {
      console.log("main_Controller - [getClientsPixels] - START");
      service.initialize(req.app.locals.db);
      service.getClientsPixels()
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log("main_Controller - [getClientsPixels] - ERROR -", err.message);
        next(err);
      })
    } catch (e) {
      console.log("main_Controller - [getClientsPixels] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("main_Controller - [getClientsPixels] - FINISH");
    }
  }

  getClient(req, res, next) {
    try {
      console.log("main_Controller - [getClient] - START");
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
        console.log("main_Controller - [getClient] - ERROR -", err.message);
        next(err.message);
      })
    } catch (e) {
      console.log("main_Controller - [getClient] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("main_Controller - [getClient] - FINISH");
    }
  }

  editClient(req, res, next) {
    try {
      console.log("main_Controller - [editClient] - START");
      service.initialize(req.app.locals.db);
      service.editClient(req.body)
      .then(result => {
        if(result) {
          res.status(200).send({code:200, message:result});
        } else {
          res.status(200).send({code:404, message:"Non è stato possobile modificare i dati del cliente"});
        }
      })
      .catch(err => {
        console.log("main_Controller - [editClient] - ERROR -", err.message);
        next(err);
      })
    } catch (e) {
      console.log("main_Controller - [editClient] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("main_Controller - [editClient] - FINISH");
    }
  }

  saveClient(req, res, next) {
    try {
      console.log("main_Controller - [saveClient] - START");
      service.initialize(req.app.locals.db);
      service.saveClient(req.body)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log("main_Controller - [saveClient] - ERROR -", err.message);
        next(err);
      })
    } catch (e) {
      console.log("main_Controller - [saveClient] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("main_Controller - [saveClient] - FINISH");
    }
  }

  getClientsFiltered(req, res, next) {
    try {
      console.log("main_Controller - [getClientsFiltered] - START");
      service.initialize(req.app.locals.db);
      service.getClientsFiltered(req.body)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log("main_Controller - [getClientsFiltered] - ERROR -", err.message);
        res.status(500).send(err);
      })
    } catch (e) {
      console.log("main_Controller - [getClientsFiltered] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("main_Controller - [getClientsFiltered] - FINISH");
    }
  }

  deleteClient(req, res, next) {
    try {
      console.log("main_Controller - [deleteClient] - START");
      service.initialize(req.app.locals.db);
      service
      .deleteClient(req.body)
      .then(result => {
        res.status(200).send(result)
      })
      .catch(err => {
        res.status(200).send(err)
      })
    } catch (e) {
      console.log("main_Controller - [deleteClient] - ERROR", e.message);
      next(e.message);
    } finally {
      console.log("main_Controller - [deleteClient] - FINISH");
    }
  }

  countPixels(req, res, next) {
    try {
      console.log("main_Controller - [countPixel] - START");
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
      console.log("main_Controller - [countPixel] - ERROR", e.message);
      next(e.message);
    } finally {
      console.log("main_Controller - [countPixel] - FINISH");
    }
  }

  resetPassword(req, res, next) {
    try {
      console.log("main_Controller - [resetPassword] - START");
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
              console.log("main_Controller - [resetPassword - session] - ERROR", err);
            } else {
              res.redirect('/api/sendMailResetPassword');
            }
          });
        }
      })
      .catch(err => {
        console.log("main_Controller - [resetPassword] - ERROR", err.message);
        next(err.message);
      })
    } catch (e) {
      console.log("main_Controller - [resetPassword] - ERROR", e.message);
      next(e.message);
    } finally{
      console.log("main_Controller - [resetPassword] - FINISH");
    }
  }

  changePassword(req, res, next) {
    try {
      console.log("main_Controller - [changePassword] - START");
      service.initialize(req.app.locals.db);
      service
      .changePassword({body:req.body, email:req.session.email})
      .then(result => {
        res.status(200).send({code:200,message:"Il cambio password è avvenuto correttamente"})
      })
      .catch(err => {
        console.log("main_Controller - [changePassword] - ERROR", err.message);
        next(err.message);
      })
    } catch (e) {
      console.log("main_Controller - [changePassword] - ERROR", e.message);
      next(e.message);
    } finally {
      console.log("main_Controller - [changePassword] - FINISH");
    }
  }
}

module.exports = new MainController();
