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
    return new Promise((resolve, reject) => {
      var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      this.generateHashedPassword(retVal)
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      })
    })
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
            resolve({real: password, hash:hashedPassword});
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
          reject(err.message);
        })
      }
    })
  }

  getUser(email) {
    console.log("database - [getUser] - START");
    return new Promise((resolve, reject) =>{
      try {
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
              resolve(result);
            } else {
              resolve(null)
            }
          })
        })
        .catch(err => {
          console.log("database - [getUser] - ERROR -", err.message);
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
          reject(err.message);
        })
      }
    })
  }

  getUsers(type) {
    console.log("database - [getUsers] - START");
    return new Promise((resolve, reject) =>{
      try {
        let query = {};
        if(type === 'Admin') {
          query = {
            "type": 'Basic'
          }
        } else if(type === 'SuperAdmin') {
          query = {
            "type": {"$in": ["Admin", "Basic"]}
          }
        } else {
          query = {
            "type": {"$in": ["Admin", "Basic"]}
          }
        }
        this.initialize();
        this.client
        .connect()
        .then(()=>{
          this.client
          .db(DB_NAME)
          .collection(COLLECTION_USER)
          .find(
            query,
            {
              projection:
              {
                "_id":0,
              }
            }
          )
          .toArray()
          .then(result=>{
            if(result) {
              resolve(result);
            } else {
              resolve(null)
            }
          })
        })
        .catch(err => {
          console.log("database - [getUsers] - ERROR -", err.message);
          reject(err);
        })
      } catch (e) {
        console.log("database - [getUsers] - ERROR -", e.message);
        reject(e)
      } finally {
        this.client.close().then(()=>{
          console.log("database - [getUsers] - FINISH");
        })
        .catch(err => {
          reject(err.message);
        })
      }
    })
  }

  login(body) {
    console.log("database - [login] - START");
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
                  reject(new Error("Password is invalid"))
                } else {
                  if(same) {
                    resolve({code:200,message:'Credenziali valide'})
                  } else {
                    resolve({code:404,message:'Credenziali invalide'})
                  }
                }
              });
            } else {
              resolve({code:404, message:"User not exist"})
            }
          })
        })
        .catch(err => {
          console.log("database - [login] - ERROR -", err.message);
          reject(err);
        })
      } catch (e) {
        console.log("database - [login] - ERROR -", e.message);
        reject(e)
      } finally {
        this.client.close().then(()=>{
          console.log("database - [login] - FINISH");
        })
        .catch(err => {
          reject(err.message);
        })
      }
    })
  }

  verifyPassword(body) {
    console.log("database - [verifyPassword] - START");
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
                  reject({code:404,message:"Password is invalid"})
                } else {
                  if(same) {
                    resolve({code:200,message:'Cambio password avvenuto con successo'})
                  } else {
                    resolve({code:404,message:"La password corrente non e' corretta"})
                  }
                }
              });
            } else {
              resolve({code:404, message:"User not exist"})
            }
          })
        })
        .catch(err => {
          console.log("database - [verifyPassword] - ERROR -", err.message);
          reject({code:404,message:err});
        })
      } catch (e) {
        console.log("database - [verifyPassword] - ERROR -", e.message);
        reject({code:404,message:e.message})
      } finally {
        this.client.close().then(()=>{
          console.log("database - [verifyPassword] - FINISH");
        })
        .catch(err => {
          reject({code:404,message:err.message});
        })
      }
    })
  }

  addUser(body) {
    console.log("database - [addUser] - START");
    return new Promise((resolve, reject) => {
      try {
        let {email, password, type} = body;
        this.initialize();
        this.client
        .connect()
        .then(()=>{
          this.generateHashedPassword(password)
          .then(result => {
            password = result.hash;
            this.getUser(email).then(value => {
              if(value) {
                reject(new Error("Utente già esistente"))
              } else {
                this.client
                .connect()
                .then(() => {
                  this.client
                  .db(DB_NAME)
                  .collection(COLLECTION_USER)
                  .insertOne(
                    {
                      "email": email,
                      "password": password,
                      "type": type
                    }
                  )
                  .then(value => {
                    resolve({code:200,message: "Utente inserito correttamente"})
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
              }
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
          reject(err.message);
        })
      }
    })
  }

  deleteUser(body) {
    console.log("database - [deleteUser] - START");
    return new Promise((resolve, reject) =>{
      try {
        const {email} = body;
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
              let user = {"email":email};
              this.client
              .connect()
              .then(() => {
                this.client
                .db(DB_NAME)
                .collection(COLLECTION_USER)
                .deleteOne(user)
                .then(result => {
                  if(result.deletedCount === 1) {
                    resolve({code:200,message:"L'utente e' stato rimosso correttamente"})
                  } else {
                    resolve({code:404,message:"Nessun utente e' stato trovato alcun utente"})
                  }
                })
                .catch(err => {
                  console.log(err);
                  resolve({code:404, message:err.message})
                })
              })
            } else {
              resolve({code:404, message:"Utente inesistente"})
            }
          })
        })
        .catch(err => {
          console.log("database - [deleteUser] - ERROR -", err.message);
          reject(err);
        })
      } catch (e) {
        console.log("database - [deleteUser] - ERROR -", e.message);
        reject(e)
      } finally {
        this.client.close().then(()=>{
          console.log("database - [deleteUser] - FINISH");
        })
        .catch(err => {
          reject(err.message);
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
              this.generatePassword()
              .then(password =>{
                const filter = { "email": email };
                const updateDoc = {
                  $set:
                  {
                    "password": password.hash
                  },
                };
                const options = { upsert: false };
                this.client
                .db(DB_NAME)
                .collection(COLLECTION_USER)
                .updateOne(filter, updateDoc, options)
                .then(value => {
                  resolve(password.real);
                })
                .catch(err => {
                  reject(err);
                })
              })
            } else {
              resolve({code:404, message:"Email inserted not exist"})
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
          reject(err.message);
        })
      }
    })
  }

  changePassword(body) {
    console.log("database - [changePassword] - START");
    return new Promise((resolve, reject) => {
      try {
        const {oldPassword, password} = body.body;
        const email = body.email;
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
              this.generateHashedPassword(password)
              .then(result => {
                let confirmPasswordHashed = result.hash;
                const updateDoc = {
                  $set:
                  {
                    "password": confirmPasswordHashed
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
              })
            } else {
              reject(new Error("Password inserted is wrong"))
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
          reject(err.message);
        })
      }
    })
  }
}


module.exports = MongoDB;
