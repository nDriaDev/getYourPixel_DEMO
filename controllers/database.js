var MongoDB = require('../mongoDB');
var db = new MongoDB();
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

class DataBase {

  getUser(req, res, next) {
      try {
        console.log("database_Controller - [getUser] - START");
        let email = req.body.email ? req.body.email : req.session.email;
        db.getUser(email)
          .then(result => {
            res.status(200).send(result)
          })
          .catch(e => {
            console.log("database_Controller - [getUser] - ERROR -", e.message);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        console.log("database_Controller - [getUser] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("database_Controller - [getUser] - FINISH");
      }
  }

  loginUser(req, res, next) {
      try {
        console.log("database_Controller - [loginUser] - START");
        db.loginUser(req.body)
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
            console.log("database_Controller - [loginUser] - ERROR -", e.message);
            next(e.message);
          })
      } catch (e) {
        console.log("database_Controller - [loginUser] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("database_Controller - [loginUser] - FINISH");
      }
  }

  saveUser(req, res, next) {
      try {
        console.log("database_Controller - [saveUser] - START");
        db.saveUser(req.body)
          .then(result => {
            res.locals.result = result;
            next();
          })
          .catch(e => {
            console.log("database_Controller - [saveUser] - ERROR -", e.message);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        console.log("database_Controller - [saveUser] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("database_Controller - [saveUser] - FINISH");
      }
  }

  activeUser(req, res, next) {
    try {
      console.log("database_Controller - [activeUser] - START");
      db.activeUser({activeToken:req.params.activeToken})
      .then(result => {
        if(result) {
          res.sendFile((require("path")).resolve(__dirname, '..','templateActivationSuccess.html'));
        } else {
          res.sendFile((require("path")).resolve(__dirname, '..','templateActivationFail.html'));
        }
      })
      .catch(err => {
        console.log("database_Controller - [activeUser] - ERROR -", err.message);
        next(err.message)
      })
    } catch (e) {
      console.log("database_Controller - [activeUser] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [activeUser] - FINISH");
    }
  }

  deleteUser(req, res, next) {
    try {
      console.log("database_Controller - [deleteUser] - START");
      db
      .deleteUser({email: req.body.email ? req.body.email : req.session.email})
      .then(result => {
        res.status(200).send(result)
      })
      .catch(err => {
        res.status(200).send(err)
      })
    } catch (e) {
      console.log("database_Controller - [deleteUser] - ERROR", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [deleteUser] - FINISH");
    }
  }

  saveClick(req, res, next) {
      try {
        console.log("database_Controller - [saveClick] - START");
        db.saveClick(req.session.email, req.body.url)
          .then(result => {
            res.status(200).send(result)
          })
          .catch(e => {
            console.log("database_Controller - [saveClick] - ERROR -", e.message);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        console.log("database_Controller - [saveClick] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("database_Controller - [saveClick] - FINISH");
      }
  }

  getAdmin(req, res, next) {
      try {
        console.log("database_Controller - [getAdmin] - START");
        let email = req.body.email ? req.body.email : req.session.email;
        db.getAdmin(email)
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
            console.log("database_Controller - [getAdmin] - ERROR -", e.message);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        console.log("database_Controller - [getAdmin] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("database_Controller - [getAdmin] - FINISH");
      }
  }

  getAdmins(req, res, next) {
      try {
        console.log("database_Controller - [getAdmins] - START");
        let type = req.body.type ? req.body.type : null;
        db.getAdmins(type)
          .then(result => {
            res.status(200).send(result)
          })
          .catch(e => {
            console.log("database_Controller - [getAdmins] - ERROR -", e.message);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        console.log("database_Controller - [getAdmins] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("database_Controller - [getAdmins] - FINISH");
      }
  }

  addAdmin(req, res, next) {
      try {
        console.log("database_Controller - [addAdmin] - START");
        db.addAdmin(req.body)
          .then(result => {
            res.status(200).send(result)
          })
          .catch(e => {
            console.log("database_Controller - [addAdmin] - ERROR -", e.message);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        console.log("database_Controller - [addAdmin] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("database_Controller - [addAdmin] - FINISH");
      }
  }

  deleteAdmin(req, res, next) {
    try {
      console.log("database_Controller - [deleteAdmin] - START");
      db
      .deleteAdmin({email: req.body.email})
      .then(result => {
        res.status(200).send(result)
      })
      .catch(err => {
        res.status(200).send(err)
      })
    } catch (e) {
      console.log("database_Controller - [deleteAdmin] - ERROR", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [deleteAdmin] - FINISH");
    }
  }

  login(req, res, next) {
      try {
        console.log("database_Controller - [login] - START");
        db.login(req.body)
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
            console.log("database_Controller - [login] - ERROR -", e.message);
            next(e.message);
          })
      } catch (e) {
        console.log("database_Controller - [login] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("database_Controller - [login] - FINISH");
      }
    }

  verifyPassword(req, res, next) {
    try {
      console.log("database_Controller - [verifyPassword] - START");
      db
      .verifyPassword({email: req.session.email, password: req.body.password})
      .then(result => {
        res.status(200).send(result)
      })
      .catch(err => {
        res.status(200).send(err)
      })
    } catch (e) {
      console.log("database_Controller - [verifyPassword] - ERROR", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [verifyPassword] - FINISH");
    }
  }

  getClientsPixels(req, res, next) {
    try {
    console.log("database_Controller - [getClientsPixels] - START");
      db.getClientsPixels()
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log("database_Controller - [getClientsPixels] - ERROR -", err.message);
        next(err);
      })
    } catch (e) {
      console.log("database_Controller - [getClientsPixels] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [getClientsPixels] - FINISH");
    }
  }

  getClient(req, res, next) {
    try {
    console.log("database_Controller - [getClient] - START");
      db.getClient(req.body)
      .then(result => {
        if(result) {
          res.status(200).send({code:200, item:result});
        } else {
          res.status(200).send({code:404, message:'Client not found'})
        }
      })
      .catch(err => {
        console.log("database_Controller - [getClient] - ERROR -", err.message);
        next(err.message);
      })
    } catch (e) {
      console.log("database_Controller - [getClient] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [getClient] - FINISH");
    }
  }

  editClient(req, res, next) {
    try {
    console.log("database_Controller - [editClient] - START");
      db.editClient(req.body)
      .then(result => {
        if(result) {
          res.status(200).send({code:200, message:result});
        } else {
          res.status(200).send({code:404, message:"Non è stato possobile modificare i dati del cliente"});
        }
      })
      .catch(err => {
        console.log("database_Controller - [editClient] - ERROR -", err.message);
        next(err);
      })
    } catch (e) {
      console.log("database_Controller - [editClient] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [editClient] - FINISH");
    }
  }

  saveClient(req, res, next) {
    try {
    console.log("database_Controller - [saveClient] - START");
      db.saveClient(req.body)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log("database_Controller - [saveClient] - ERROR -", err.message);
        next(err);
      })
    } catch (e) {
      console.log("database_Controller - [saveClient] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [saveClient] - FINISH");
    }
  }

  getClientsFiltered(req, res, next) {
    try {
    console.log("database_Controller - [getClientsFiltered] - START");
      db.getClientsFiltered(req.body)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log("database_Controller - [getClientsFiltered] - ERROR -", err.message);
        res.status(500).send(err);
      })
    } catch (e) {
      console.log("database_Controller - [getClientsFiltered] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [getClientsFiltered] - FINISH");
    }
  }

  deleteClient(req, res, next) {
    try {
      console.log("database_Controller - [deleteClient] - START");
      db
      .deleteClient(req.body)
      .then(result => {
        res.status(200).send(result)
      })
      .catch(err => {
        res.status(200).send(err)
      })
    } catch (e) {
      console.log("database_Controller - [deleteClient] - ERROR", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [deleteClient] - FINISH");
    }
  }

  countPixels(req, res, next) {
    try {
      console.log("database_Controller - [countPixel] - START");
      db
      .countPixels()
      .then(result => {
        res.status(200).send(""+result)
      })
      .catch(err => {
        res.status(200).send(err)
      })
    } catch (e) {
      console.log("database_Controller - [countPixel] - ERROR", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [countPixel] - FINISH");
    }
  }

  resetPassword(req, res, next) {
    try {
      console.log("database_Controller - [resetPassword] - START");
      db.resetPassword(req.body)
      .then(result => {
        if(!result) {
          throw new Error(result);
        }
        if(result.code === 404){
          res.status(200).send({code: result.code, message:result.message});
        } else{
          req.session.password = result;
          req.session.email = req.body.email;
          req.session.save(function(err) {
            if(err) {
              console.log("database_Controller - [resetPassword - session] - ERROR", err);
            } else {
              res.redirect('/api/sendMailResetPassword');
            }
          });
        }
      })
      .catch(err => {
        console.log("database_Controller - [resetPassword] - ERROR", err.message);
        next(err.message);
      })
    } catch (e) {
      console.log("database_Controller - [resetPassword] - ERROR", e.message);
      next(e.message);
    } finally{
      console.log("database_Controller - [resetPassword] - FINISH");
    }
  }

  changePassword(req, res, next) {
    try {
      console.log("database_Controller - [changePassword] - START");
      db
      .changePassword({body:req.body, email:req.session.email})
      .then(result => {
        res.status(200).send({code:200,message:"Il cambio password è avvenuto correttamente"})
      })
      .catch(err => {
        console.log("database_Controller - [changePassword] - ERROR", err.message);
        next(err.message);
      })
    } catch (e) {
      console.log("database_Controller - [changePassword] - ERROR", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [changePassword] - FINISH");
    }
  }
}

module.exports = new DataBase();
