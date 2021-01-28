var MongoDB = require('../mongoDB');
var db = new MongoDB();
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

class DataBase {

  getClient(req, res, next) {
      try {
        console.log("database_Controller - [getClient] - START");
        let email = req.body.email ? req.body.email : req.session.email;
        db.getClient(email)
          .then(result => {
            res.status(200).send(result)
          })
          .catch(e => {
            console.log("database_Controller - [getClient] - ERROR -", e.message);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        console.log("database_Controller - [getClient] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("database_Controller - [getClient] - FINISH");
      }
  }

  loginClient(req, res, next) {
      try {
        console.log("database_Controller - [loginClient] - START");
        db.loginClient(req.body)
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
            console.log("database_Controller - [loginClient] - ERROR -", e.message);
            next(e.message);
          })
      } catch (e) {
        console.log("database_Controller - [loginClient] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("database_Controller - [loginClient] - FINISH");
      }
  }

  registryClient(req, res, next) {
      try {
        console.log("database_Controller - [registryClient] - START");
        db.registryClient(req.body)
          .then(result => {
            res.locals.result = result;
            next();
          })
          .catch(e => {
            console.log("database_Controller - [registryClient] - ERROR -", e.message);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        console.log("database_Controller - [registryClient] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("database_Controller - [registryClient] - FINISH");
      }
  }

  activeClient(req, res, next) {
    try {
      console.log("database_Controller - [registryClient] - START");
      db.activeClient({activeToken:req.params.activeToken})
      .then(result => {
        if(result) {
          res.sendFile((require("path")).resolve(__dirname, '..','templateActivationSuccess.html'));
        } else {
          res.sendFile((require("path")).resolve(__dirname, '..','templateActivationFail.html'));
        }
      })
      .catch(err => {
        console.log("database_Controller - [registryClient] - ERROR -", err.message);
        next(err.message)
      })
    } catch (e) {
      console.log("database_Controller - [registryClient] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [registryClient] - FINISH");
    }
  }

  saveClick(req, res, next) {
      try {
        console.log("database_Controller - [saveClick] - START");
        db.saveClick({emailClient:req.session.email, urlClicked: req.body.url})
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

  getUser(req, res, next) {
      try {
        console.log("database_Controller - [getUser] - START");
        let email = req.body.email ? req.body.email : req.session.email;
        db.getUser(email)
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

  getUsers(req, res, next) {
      try {
        console.log("database_Controller - [getUsers] - START");
        let type = req.body.type ? req.body.type : null;
        db.getUsers(type)
          .then(result => {
            res.status(200).send(result)
          })
          .catch(e => {
            console.log("database_Controller - [getUsers] - ERROR -", e.message);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        console.log("database_Controller - [getUsers] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("database_Controller - [getUsers] - FINISH");
      }
  }

  addUser(req, res, next) {
      try {
        console.log("database_Controller - [addUser] - START");
        db.addUser(req.body)
          .then(result => {
            res.status(200).send(result)
          })
          .catch(e => {
            console.log("database_Controller - [addUser] - ERROR -", e.message);
            res.status(200).send({code:500,message:e.message});
          })
      } catch (e) {
        console.log("database_Controller - [addUser] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("database_Controller - [addUser] - FINISH");
      }
  }

  deleteUser(req, res, next) {
    try {
      console.log("database_Controller - [deleteUser] - START");
      db
      .deleteUser({email: req.body.email})
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

  getPixels(req, res, next) {
    try {
    console.log("database_Controller - [getPixels] - START");
      db.getPixels()
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log("database_Controller - [getPixels] - ERROR -", err.message);
        next(err);
      })
    } catch (e) {
      console.log("database_Controller - [getPixels] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [getPixels] - FINISH");
    }
  }

  getFullPixel(req, res, next) {
    try {
    console.log("database_Controller - [getFullPixel] - START");
      db.getFullPixel(req.body)
      .then(result => {
        if(result) {
          res.status(200).send({code:200, item:result});
        } else {
          res.status(200).send({code:404, message:'Client not found'})
        }
      })
      .catch(err => {
        console.log("database_Controller - [getFullPixel] - ERROR -", err.message);
        next(err.message);
      })
    } catch (e) {
      console.log("database_Controller - [getFullPixel] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [getFullPixel] - FINISH");
    }
  }

  editPixel(req, res, next) {
    try {
    console.log("database_Controller - [editPixel] - START");
      db.editPixel(req.body)
      .then(result => {
        if(result) {
          res.status(200).send({code:200, message:result});
        } else {
          res.status(200).send({code:404, message:"Non è stato possobile modificare i dati del cliente"});
        }
      })
      .catch(err => {
        console.log("database_Controller - [editPixel] - ERROR -", err.message);
        next(err);
      })
    } catch (e) {
      console.log("database_Controller - [editPixel] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [editPixel] - FINISH");
    }
  }

  savePixel(req, res, next) {
    try {
    console.log("database_Controller - [savePixel] - START");
      db.savePixel(req.body)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log("database_Controller - [savePixel] - ERROR -", err.message);
        next(err);
      })
    } catch (e) {
      console.log("database_Controller - [savePixel] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [savePixel] - FINISH");
    }
  }

  getPixelsFiltered(req, res, next) {
    try {
    console.log("database_Controller - [getPixelsFiltered] - START");
      db.getPixelsFiltered(req.body)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log("database_Controller - [getPixelsFiltered] - ERROR -", err.message);
        res.status(500).send(err);
      })
    } catch (e) {
      console.log("database_Controller - [getPixelsFiltered] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [getPixelsFiltered] - FINISH");
    }
  }

  removePixel(req, res, next) {
    try {
      console.log("database_Controller - [removePixel] - START");
      db
      .removePixel(req.body)
      .then(result => {
        res.status(200).send(result)
      })
      .catch(err => {
        res.status(200).send(err)
      })
    } catch (e) {
      console.log("database_Controller - [removePixel] - ERROR", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [removePixel] - FINISH");
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
