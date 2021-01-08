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

  savePixels(req, res, next) {
    try {
    console.log("database_Controller - [savePixels] - START");
      db.savePixels(req.body)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log("database_Controller - [savePixels] - ERROR -", err.message);
        next(err);
      })
    } catch (e) {
      console.log("database_Controller - [savePixels] - ERROR -", e.message);
      next(e.message);
    } finally {
      console.log("database_Controller - [savePixels] - FINISH");
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
