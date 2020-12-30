var MongoDB = require('../mongoDB');
var db = new MongoDB();
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

class DataBase {
  addUser(req, res, next) {
      try {
        console.log("database_Controller - [addUser] - START");
        db.addUser(req.body)
          .then(result => {
            res.status(200).send(result)
          })
          .catch(e => {
            console.log("database_Controller - [addUser] - ERROR -", e.message);
            next(e.message);
          })
      } catch (e) {
        console.log("database_Controller - [addUser] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("database_Controller - [addUser] - FINISH");
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
      .changePassword(req.body)
      .then(result => {
        res.status(200).send({message:"Il cambio password è avvenuto correttamente"})
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
