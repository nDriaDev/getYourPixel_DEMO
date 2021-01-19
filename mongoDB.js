var {MongoClient} = require('mongodb');
var urlDB = process.env.MONDODB_URI ?
  process.env.MONDODB_URI
  :
  '<insert your mongoDB uri here>'

const bcrypt = require('bcrypt');
const Compressor = require('./compressionUtil');
const ImageBuilder = require('./imageUtil');
const DB_NAME = 'getYourPixels';
const COLLECTION_USER = '_user';
const COLLECTION_PIXEL = '_pixel';
const SALT_ROUNDS = 10;

class MongoDB {
  constructor() {
    this.client = null;
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

  resizeImage(file, row, col) {
    return new Promise((resolve,reject) => {
      try {
        ImageBuilder.resize(file,row,col)
        .then(value => {
          resolve(value)
        })
      } catch (e) {
        reject(e);
      }
    })
  }

  savePixel(body) {
    console.log("database - [savePixels] - START");
    return new Promise((resolve, reject) => {
      try {
        let {email, url, company, file, row, col} = body;
        ImageBuilder.resize(file, row, col)
        .then(value => {
          file = value;
          Compressor.compressChilkat(file.base64)
          .then(value => {
            file.base64 = value;
            this.initialize();
            this.client
            .connect()
            .then(() => {
              let data = {};
              if(company === '') {
                data = {
                  "email": email,
                  "url": url,
                  "file": file,
                  "row": row,
                  "col": col,
                  "date": new Date(),
                }
              } else {
                data = {
                  "email": email,
                  "url": url,
                  "company": company,
                  "file": file,
                  "row": row,
                  "col": col,
                  "date": new Date(),
                }
              }
              this.client
              .db(DB_NAME)
              .collection(COLLECTION_PIXEL)
              .findOne({
                email:data.email,
                url: data.url,
                company:data.company,
                "file.name":data.file.name
              },{
                "_id":0
              })
              .then(result => {
                if(result) {
                  resolve({code:500,message: "Il cliente " + data.email + " ha gia' caricato un immagine con nome " + data.file.name + " per pubblicizzare la pagina " + data.url})
                } else {
                  this.client
                  .connect()
                  .then(() => {
                    this.client
                    .db(DB_NAME)
                    .collection(COLLECTION_PIXEL)
                    .insertOne(
                      data
                    )
                    .then(value => {
                      resolve({code:200,message: "Immagine e url inseriti correttamente"})
                    })
                    .catch(err => {
                      console.log("database - [savePixels] - ERROR -", err);
                      reject(err);
                    })
                  }).catch(err => {
                    console.log("database - [savePixels] - ERROR -", err);
                    reject(err)
                  })
                }
              })
              .catch(err => {
                console.log("database - [savePixels] - ERROR -", err);
                reject(err);
              });
            })
            .catch(err => {
              console.log("database - [savePixels] - ERROR -", err);
              reject(err);
            })
          })
        })
        .catch(err => {
          reject(err);
        })
      } catch (e) {
        console.log("database - [savePixels] - ERROR -", e);
        reject(e)
      } finally {
        this.client.close().then(()=>{
          console.log("database - [savePixels] - FINISH");
        })
        .catch(err => {
          reject(err.message);
        })
      }
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
                "_id":0,
                "email":0,
                "company":0,
                "date":0
              }
            }
          )
          .toArray()
          .then(items => {
            var promises = [];
            for(let i in items) {
              promises.push(Compressor.decompressChilkat(items[i].file.base64)
              .then(value => {
                // items[i].file.base64 = 'data:' + items[i].file.type + ';base64,' + value;
                items[i].file.base64 = value;
                return(items[i]);
              })
              .catch(err => {
                return(err);
              }))
            }
            Promise.all(promises)
            .then(values => {
              ImageBuilder.createPixels(values)
              .then(value => {
                resolve(value);
              })
              .catch(err => {
                console.log("database - [getPixels] - ERROR -", err.message);
                reject(err);
              })
            })
            .catch(err => {
              console.log("database - [getPixels] - ERROR -", err.message);
              reject(err);
            })
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

  getFullPixel(body) {
    console.log("database - [getFullPixel] - START");
    return new Promise((resolve,reject) => {
      try {
        const {filtro, target} = body;
        let query = {};
        if(filtro === 'Email cliente') {
          query['email'] = target
        } else if(filtro === 'Pagina pubblicizzata') {
          query['url'] = target
        } else {
          query['company'] = target
        }
        this.initialize();
        this.client
        .connect()
        .then(value => {
          this.client
          .db(DB_NAME)
          .collection(COLLECTION_PIXEL)
          .findOne(
              query
            ,
            {
              sort:
              {
                "date": 1
              }
            }
          )
          .then(result => {
            if(result) {
              //Converto in stringa il mongoDB ObjectID che è usato come chiave unvioca
              result._id = JSON.stringify(result._id);
              resolve(result);
            } else {
              resolve(null)
            }
          })
          .catch(err => {
            resolve(err);
          })
        })
        .catch(err => {
          console.log("database - [getFullPixel] - ERROR -", err);
          reject(err);
        })
      } catch (e) {
        console.log("database - [getFullPixel] - ERROR -", e);
        reject(e);
      } finally {
        this.client.close().then(()=>{
          console.log("database - [getFullPixel] - FINISH");
        })
        .catch(err => {
          reject(err);
        })
      }
    })
  }

  getPixelsFiltered(body) {
    console.log("database - [getPixelsFiltered] - START");
    return new Promise((resolve,reject) => {
      try {
        const {filtro} = body;
        let optionsProjection = {};
        if(filtro === 'Email cliente') {
          optionsProjection = {
            "_id": 0,
            "url":0,
            "company":0,
            "file":0,
            "row":0,
            "col":0,
            "date":0
          }
        } else if(filtro === 'Pagina pubblicizzata') {
          optionsProjection = {
            "_id": 0,
            "email":0,
            "company":0,
            "file":0,
            "row":0,
            "col":0,
            "date":0
          }
        } else {
         optionsProjection = {
           "_id": 0,
           "email":0,
           "url":0,
           "file":0,
           "row":0,
           "col":0,
           "date":0
         }
       }
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
              projection: optionsProjection
            }
          )
          .toArray()
          .then(items => {
            let result = [];
            for(let i in items) {
              result.push(items[i].email ? items[i].email : items[i].company ? items[i].company : items[i].url ? items[i].url : 'N.D.');
            }
            resolve({valuesList:result});
          })
          .catch(err => {
            resolve(err);
          })
        })
        .catch(err => {
          console.log("database - [getPixelsFiltered] - ERROR -");
          reject(err);
        })
      } catch (e) {
        console.log("database - [getPixelsFiltered] - ERROR -");
        reject(e);
      } finally {
        this.client.close().then(()=>{
          console.log("database - [getPixelsFiltered] - FINISH");
        })
        .catch(err => {
          reject(err.message);
        })
      }
    })
  }

  editPixel(body) {
    console.log("database - [editPixel] - START");
    return new Promise((resolve, reject) => {
      try {
        let {id, email, url, company, file, row, col} = body;
        this.initialize();
        this.client
        .connect()
        .then(result => {
          this.client
          .db(DB_NAME)
          .collection(COLLECTION_PIXEL)
          .findOne({
            //Converto in mongoDB ObjectID la stringa _id
            "_id":require('mongodb').ObjectID(id)
          },{
          })
          .then(result => {
            if(result) {
              if(file.base64 !== result.file.base64) {
                ImageBuilder.resize(file, row, col)
                .then(value => {
                  file = value;
                  Compressor.compressChilkat(file.base64)
                  .then(value => {
                    file.base64 = value;
                    let data = {};
                    let options = { "upsert": false };
                    if(company === '') {
                      data = {
                        "$set":{
                          "email": email,
                          "url": url,
                          "file": file,
                          "row": row,
                          "col": col,
                        }
                      }
                      options['$unset'] = {'company':1};
                    } else {
                      data = {
                        "$set":{
                          "email": email,
                          "url": url,
                          "company": company,
                          "file": file,
                          "row": row,
                          "col": col,
                        }
                      }
                    }
                    this.client
                    .connect()
                    .then(() => {
                      this.client
                      .db(DB_NAME)
                      .collection(COLLECTION_PIXEL)
                      .updateOne(
                        {"_id": result['_id']}, data, options
                      )
                      .then(value => {
                        const { matchedCount, modifiedCount } = value;
                        if(matchedCount && modifiedCount) {
                          resolve("Dati modificati correttamente")
                        } else {
                          reject({message:"Non e' stato possibile modificare i dati del cliente"})
                        }
                      })
                      .catch(err => {
                        console.log("database - [editPixel] - ERROR -", err);
                        reject(err);
                      })
                    })
                    .catch(err => {
                      console.log("database - [editPixel] - ERROR -", err);
                      reject(err);
                    })
                  })
                  .catch(err => {
                    console.log("database - [editPixel] - ERROR -", err);
                    reject(err);
                  })
                })
                .catch(err => {
                  console.log("database - [editPixel] - ERROR -", err);
                  reject(err);
                })
              } else {
                let data = {};
                let options = { "upsert": false };
                if(company === '') {
                  data = {
                    "$set":{
                      "email": email,
                      "url": url,
                      "row": row,
                      "col": col,
                    }
                  }
                } else {
                  data = {
                    "$set":{
                      "email": email,
                      "url": url,
                      "company": company,
                      "row": row,
                      "col": col,
                    }
                  }
                }
                this.client
                .connect()
                .then(() => {
                  this.client
                  .db(DB_NAME)
                  .collection(COLLECTION_PIXEL)
                  .updateOne(
                    {"_id": result['_id']}, data, options
                  )
                  .then(value => {
                    const { matchedCount, modifiedCount } = value;
                    if(matchedCount && modifiedCount) {
                      resolve("Dati modificati correttamente")
                    }
                  })
                  .catch(err => {
                    console.log("database - [editPixel] - ERROR -", err);
                    reject(err);
                  })
                })
                .catch(err => {
                  console.log("database - [editPixel] - ERROR -", err);
                  reject(err);
                })
              }
            } else {
              resolve(null);
            }
          })
          .catch(err => {
            console.log("database - [editPixel] - ERROR -", err);
            reject(err);
          })
        })
        .catch(err => {
          console.log("database - [editPixel] - ERROR -", err);
          reject(err);
        })
      } catch (e) {
        console.log("database - [editPixel] - ERROR -", e);
        reject(e)
      } finally {
        this.client.close().then(()=>{
          console.log("database - [editPixel] - FINISH");
        })
        .catch(err => {
          reject(err.message);
        })
      }
    })
  }

  removePixel(body) {
    console.log("database - [removePixel] - START");
    return new Promise((resolve, reject) =>{
      try {
        let {target} = body;
        target = target.split(' - ')[0].trim();
        let query =
        {
          $or: [
            { email : target },
            { company : target },
          ]
        }

        this.initialize();
        this.client
        .connect()
        .then(()=>{
          this.client
          .db(DB_NAME)
          .collection(COLLECTION_PIXEL)
          .findOne(
            query,
            {
              projection:
              {
                "_id":0,
                "file":0,
                "date":0
              }
            }
          )
          .then(result=>{
            if(result) {
              let pixel = result;
              this.client
              .connect()
              .then(() => {
                this.client
                .db(DB_NAME)
                .collection(COLLECTION_PIXEL)
                .deleteOne(pixel)
                .then(result => {
                  this.client.close().then(()=>{
                    if(result.deletedCount === 1) {
                      resolve({code:200,message:"L'immagine e' stata rimossa correttamente"})
                    } else {
                      resolve({code:404,message:"Nessun immagine e' stato trovato con i criteri specificati"})
                    }
                    console.log("database - [removePixel] - FINISH");
                  })
                  .catch(err => {
                    this.client.close().then(()=>{
                      console.log("database - [removePixel] - ERROR -", err.message);
                      reject(err.message);
                      console.log("database - [removePixel] - FINISH");
                    })
                  })
                })
                .catch(err => {
                  this.client.close().then(()=>{
                    console.log("database - [removePixel] - ERROR -", err.message);
                    resolve({code:404, message:err.message})
                    console.log("database - [removePixel] - FINISH");
                  })
                })
              })
            } else {
              this.client.close().then(()=>{
                resolve({code:404, message:"Immagine inesistente"})
              })
            }
          })
        })
        .catch(err => {
          this.client.close().then(()=>{
            console.log("database - [removePixel] - ERROR -", err.message);
            reject(err.message);
            console.log("database - [removePixel] - FINISH");
          })
        })
      } catch (e) {
        this.client.close().then(()=>{
          console.log("database - [removePixel] - ERROR -", e.message);
          reject(e)
          console.log("database - [removePixel] - FINISH");
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

  countPixels() {
    console.log("database - [countPixel] - START");
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
                "_id":0,
                "email":0,
                "company":0,
                "date":0,
                "file":0,
                "url":0
              }
            }
          )
          .toArray()
          .then(items => {
            let pixelRemaining = 0;
            for(let i in items) {
              pixelRemaining += (items[i].col*items[i].row);
            }
            resolve(40128-pixelRemaining);
          })
          .catch(err => {
            console.log("database - [countPixel] - ERROR -", err.message);
            reject(err);
          })
          })
        .catch(err => {
          console.log("database - [countPixel] - ERROR -", err.message);
          reject(err);
        })
      } catch (e) {
        console.log("database - [countPixel] - ERROR -", e.message);
        reject(e);
      } finally {
        this.client.close().then(()=>{
          console.log("database - [countPixel] - FINISH");
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
        const {password} = body.body;
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
