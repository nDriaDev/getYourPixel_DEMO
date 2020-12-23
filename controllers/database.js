var MongoDB = require('../mongoDB');
var db = new MongoDB();
const jwt = require('jsonwebtoken');
var secret = process.env.SECRET_KEY ?
  process.env.SECRET_KEY
  :
  '6151addb-2735-4bd5-bdf4-b2b3d51c7860'


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
        console.log("database_Controller - [getUser] - START");
        db.login(req.body)
          .then(result => {
            if(result.code == 200){
              let token = jwt.sign({email:req.body.email}, secret, {expiresIn: '1h'});
              res.cookie('token', token, {httpOnly: true}).status(200).send(result)
            } else {
              res.status(404).send(result);
            }
          })
          .catch(e => {
            console.log("database_Controller - [getUser] - ERROR -", e.message);
            next(e.message);
          })
      } catch (e) {
        console.log("database_Controller - [getUser] - ERROR -", e.message);
        next(e.message);
      } finally {
        console.log("database_Controller - [getUser] - FINISH");
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
        console.log("database_Controller - [getPixels] - ERROR -", e.message);
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
        res.redirect('/sendMailResetPassword?password=' + result);
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
