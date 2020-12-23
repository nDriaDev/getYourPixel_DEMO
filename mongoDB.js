var {MongoClient} = require('mongodb');
var urlDB = process.env.MONDODB_URI ?
  process.env.MONDODB_URI
  :
  // '<insert your mongoDB uri here>'
  'mongodb+srv://admin:2ZyBrma4g19dkAA3@cluster0.z7ylt.mongodb.net/getYourPixels?retryWrites=true&w=majority'

const bcrypt = require('bcrypt');

const DB_NAME = 'getYourPixels';
const COLLECTION_USER = '_user';
const COLLECTION_PIXEL = '_pixel';
const SALT_ROUNDS = 10;
class MongoDB {
  constructor() {
    this.client;
  }

  initialize() {
    this.client = new MongoClient(urlDB, {useUnifiedTopology: true});
  }

  generatePassword() {
      var length = 8,
          charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          retVal = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
          retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      return retVal;
  }

  generateHashedPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, SALT_ROUNDS,
        function(err, hashedPassword) {
          if (err) {
            console.log("database - [generateHashedPassword] - ERROR -", err.message);
            reject(err);
          }
          else {
            resolve(hashedPassword);
          }
        })
    })
  }

  getPixels() {
    console.log("database - [getPixels] - START");
    return new Promise((resolve,reject) => {
      try {
        this.initialize();
        this.client
        .connect()
        .then(value => {
          this.client
          .db(DB_NAME)
          .collection(COLLECTION_PIXEL)
          .find(
            {

            },
            {
              sort:
              {
                "date": 1
              }
              ,
              projection:
              {
                "_id":0
              }
            }
          )
          .toArray()
          .then(items => {
            resolve(items);
            })
          })
          .catch(err => {
            console.log("database - [getPixels] - ERROR -");
            reject(err);
          })
      } catch (e) {
        console.log("database - [getPixels] - ERROR -");
        reject(e);
      } finally {
        this.client.close().then(()=>{
          console.log("database - [getPixels] - FINISH");
        })
        .catch(err => {
          next(err.message);
        })
      }
    })
  }

  login(body) {
    console.log("database - [getUser] - START");
    return new Promise((resolve, reject) =>{
      try {
        const {email, password} = body;
        this.initialize();
        this.client
        .connect()
        .then(()=>{
          this.client
          .db(DB_NAME)
          .collection(COLLECTION_USER)
          .findOne(
            {
              "email": email,
            },
            {
              projection:
              {
                "_id":0,
              }
            }
          )
          .then(result=>{
            if(result) {
              bcrypt.compare(password, result.password, function(err, same) {
                if (err) {
                  throw new Error("Password is invalid")
                } else {
                  if(same) {
                    resolve({code:200,message:'credenziali valide'})
                  } else {
                    resolve({code:404,message:'credenziali invalide'})
                  }
                }
              });
            } else {
              throw new Error("User not exist");
            }
          })
          .catch(err => {
            reject(err);
          })
        })
        .catch(err => {
          console.log("database - [getUser] - ERROR -", e.message);
          reject(err);
        })
      } catch (e) {
        console.log("database - [getUser] - ERROR -", e.message);
        reject(e)
      } finally {
        this.client.close().then(()=>{
          console.log("database - [getUser] - FINISH");
        })
        .catch(err => {
          next(err.message);
        })
      }
    })
  }

  addUser(body) {
    console.log("database - [addUser] - START");
    return new Promise((resolve, reject) => {
      try {
        let {email, password} = body;
        this.initialize();
        this.client
        .connect()
        .then(()=>{
          this.generateHashedPassword(password)
          .then(result => {
            password = result;
            this.client
            .connect()
            .then(() => {
              this.client
              .db(DB_NAME)
              .collection(COLLECTION_USER)
              .insertOne(
                {
                  "email": email,
                  "password": password
                }
              )
              .then(value => {
                resolve({message: "Insert user completed"})
              })
              .catch(err => {
                console.log("database - [addUser] - ERROR -", err);
                reject(err);
              })
            })
            .catch(err => {
              console.log("database - [addUser] - ERROR -", err);
              reject(err);
            })
          })
          .catch(err => {
            console.log("database - [addUser] - ERROR -", err);
            reject(err);
          })
        })
        .catch(err => {
          console.log("database - [addUser] - ERROR -", err.message);
          reject(err);
        })
      } catch (e) {
        console.log("database - [addUser] - ERROR -", e);
        reject(e)
      } finally {
        this.client.close().then(()=>{
          console.log("database - [addUser] - FINISH");
        })
        .catch(err => {
          next(err.message);
        })
      }
    })
  }

  resetPassword(body) {
    console.log("database - [resetPassword] - START");
    return new Promise((resolve, reject) => {
      try {
        const {email} = body;
        this.initialize();
        this.client
        .connect()
        .then(() => {
          this.client
          .db(DB_NAME)
          .collection(COLLECTION_USER)
          .findOne(
            {
              "email": email
            },
            {
              projection:
              {
                "_id":0,
                "password":0
              }
            }
          )
          .then(result => {
            if(result){
              let password = this.generatePassword();
              const filter = { "email": email };
              const updateDoc = {
                $set:
                {
                  "password": password
                },
              };
              const options = { upsert: false };
              this.client
              .db(DB_NAME)
              .collection(COLLECTION_USER)
              .updateOne(filter, updateDoc, options)
              .then(value => {
                resolve(password);
              })
              .catch(err => {
                reject(err);
              })
            } else {
              throw new Error("Email inserted not exist")
            }
          })
          .catch(err => {
            reject(err);
          })
        }).catch(err => {
          console.log("database - [resetPassword] - ERROR", err.message);
          reject(err);
        })
      } catch (e) {
        console.log("database - [resetPassword] - ERROR", e.message);
        reject(e);
      } finally {
        this.client.close().then(() => {
          console.log("database - [resetPassword] - FINISH");
        })
        .catch(err => {
          next(err.message);
        })
      }
    })
  }

  changePassword(body) {
    console.log("database - [changePassword] - START");
    return new Promise((resolve, reject) => {
      try {
        const {email, password, newPassword} = body;
        this.initialize();
        this.client
        .connect()
        .then(value => {
          this.client
          .db(DB_NAME)
          .collection(COLLECTION_USER)
          .findOne(
            {
              "email": email,
              "password": password
            }
            ,
            {
              projection:
              {
                "_id":0,
              }
            }
          )
          .then(value => {
            if(value) {
              const filter = { "email": email };
              const updateDoc = {
                $set:
                {
                  "password": newPassword
                },
              };
              const options = { upsert: false };
              this.client
              .db(DB_NAME)
              .collection(COLLECTION_USER)
              .updateOne(filter, updateDoc, options)
              .then(value => {
                resolve(password);
              })
              .catch(err => {
                reject(err);
              })
            } else {
              throw new Error("Password inserted is wrong")
            }
          })
          .catch(err => {
            console.log("database - [changePassword] - ERROR", err.message);
            reject(err);
          })
        })
      } catch (e) {
        console.log("database - [changePassword] - ERROR", e.message);
        reject(e);
      } finally {
        this.client.close().then(() => {
          console.log("database - [changePassword] - FINISH");
        })
        .catch(err => {
          next(err.message);
        })
      }
    })
  }
}


module.exports = MongoDB;
