var {
  MongoClient
} = require('mongodb');
var urlDB = process.env.MONGODB_URI ?
  process.env.MONGODB_URI :
  '<insert your mongoDB uri here>'

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Compressor = require('./compressionUtil');
const ImageBuilder = require('./imageUtil');
const DB_NAME = 'getYourPixels';
const COLLECTION_ADMIN = '_admin';
const COLLECTION_USER = '_user';
const COLLECTION_CLICK = '_click';
const COLLECTION_CLIENT = '_client';
const SALT_ROUNDS = 10;

class MongoDB {
  constructor() {
    this.client = null;
    this.ObjectID = require('mongodb').ObjectID;
  }

  initialize() {
    this.client = new MongoClient(urlDB, {
      useUnifiedTopology: true
    });
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
          } else {
            resolve({
              real: password,
              hash: hashedPassword
            });
          }
        })
    })
  }

  resizeImage(file, row, col) {
    return new Promise((resolve, reject) => {
      try {
        ImageBuilder.resize(file, row, col)
          .then(value => {
            resolve(value)
          })
      } catch (e) {
        reject(e);
      }
    })
  }

  saveClient(body) {
    console.log("database - [saveClient] - START");
    return new Promise((resolve, reject) => {
      try {
        let {
          email,
          url,
          company,
          file,
          row,
          col,
          positionRow,
          positionCol
        } = body;
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
                    if (company === '') {
                      if (positionRow === '' && positionCol === '') {
                        data = {
                          "email": email,
                          "url": url,
                          "file": file,
                          "row": row,
                          "col": col,
                          "date": new Date(),
                        }
                      } else if (positionRow === '' && positionCol !== '') {
                        data = {
                          "email": email,
                          "url": url,
                          "file": file,
                          "row": row,
                          "col": col,
                          "positionRow": 0,
                          "positionCol": (+positionCol) - 1,
                          "date": new Date(),
                        }
                      } else if (positionRow !== '' && positionCol === '') {
                        data = {
                          "email": email,
                          "url": url,
                          "file": file,
                          "row": row,
                          "col": col,
                          "positionRow": (+positionRow) - 1,
                          "positionCol": 0,
                          "date": new Date(),
                        }
                      } else {
                        data = {
                          "email": email,
                          "url": url,
                          "file": file,
                          "row": row,
                          "col": col,
                          "positionRow": (+positionRow) - 1,
                          "positionCol": (+positionCol) - 1,
                          "date": new Date(),
                        }
                      }
                    } else {
                      if (positionRow === '' && positionCol === '') {
                        data = {
                          "email": email,
                          "url": url,
                          "company": company,
                          "file": file,
                          "row": row,
                          "col": col,
                          "date": new Date(),
                        }
                      } else if (positionRow === '' && positionCol !== '') {
                        data = {
                          "email": email,
                          "url": url,
                          "company": company,
                          "file": file,
                          "row": row,
                          "col": col,
                          "positionRow": 0,
                          "positionCol": (+positionCol) - 1,
                          "date": new Date(),
                        }
                      } else if (positionRow !== '' && positionCol === '') {
                        data = {
                          "email": email,
                          "url": url,
                          "company": company,
                          "file": file,
                          "row": row,
                          "col": col,
                          "positionRow": (+positionRow) - 1,
                          "positionCol": 0,
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
                          "positionRow": (+positionRow) - 1,
                          "positionCol": (+positionCol) - 1,
                          "date": new Date(),
                        }
                      }
                    }
                    this.client
                      .db(DB_NAME)
                      .collection(COLLECTION_CLIENT)
                      .findOne({
                        email: data.email,
                        url: data.url,
                        company: data.company,
                        "file.name": data.file.name
                      }, {
                        "_id": 0
                      })
                      .then(result => {
                        if (result) {
                          resolve({
                            code: 500,
                            message: "Il cliente " + data.email + " ha gia' caricato un immagine con nome " + data.file.name + " per pubblicizzare la pagina " + data.url
                          })
                        } else {
                          this.client
                            .connect()
                            .then(() => {
                              this.client
                                .db(DB_NAME)
                                .collection(COLLECTION_CLIENT)
                                .insertOne(
                                  data
                                )
                                .then(value => {
                                  resolve({
                                    code: 200,
                                    message: "Immagine e url inseriti correttamente"
                                  })
                                })
                                .catch(err => {
                                  console.log("database - [saveClient] - ERROR -", err);
                                  reject(err);
                                })
                            }).catch(err => {
                              console.log("database - [saveClient] - ERROR -", err);
                              reject(err)
                            })
                        }
                      })
                      .catch(err => {
                        console.log("database - [saveClient] - ERROR -", err);
                        reject(err);
                      });
                  })
                  .catch(err => {
                    console.log("database - [saveClient] - ERROR -", err);
                    reject(err);
                  })
              })
          })
          .catch(err => {
            reject(err);
          })
      } catch (e) {
        console.log("database - [saveClient] - ERROR -", e);
        reject(e)
      } finally {
        this.client.close().then(() => {
            console.log("database - [saveClient] - FINISH");
          })
          .catch(err => {
            reject(err.message);
          })
      }
    })
  }

  getClientsPixels() {
    console.log("database - [getClientsPixels] - START");
    return new Promise((resolve, reject) => {
      try {
        this.initialize();
        this.client
          .connect()
          .then(value => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_CLIENT)
              .find({

              }, {
                sort: {
                  "date": 1
                },
                projection: {
                  "_id": 0,
                  "email": 0,
                  "company": 0,
                  "date": 0
                }
              })
              .toArray()
              .then(items => {
                var promises = [];
                for (let i in items) {
                  promises.push(Compressor.decompressChilkat(items[i].file.base64)
                    .then(value => {
                      // items[i].file.base64 = 'data:' + items[i].file.type + ';base64,' + value;
                      items[i].file.base64 = value;
                      return (items[i]);
                    })
                    .catch(err => {
                      return (err);
                    }))
                }
                Promise.all(promises)
                  .then(values => {
                    ImageBuilder.createPixels(values)
                      .then(value => {
                        resolve(value);
                      })
                      .catch(err => {
                        console.log("database - [getClientsPixels] - ERROR -", err.message);
                        reject(err);
                      })
                  })
                  .catch(err => {
                    console.log("database - [getClientsPixels] - ERROR -", err.message);
                    reject(err);
                  })
              })
          })
          .catch(err => {
            console.log("database - [getClientsPixels] - ERROR -");
            reject(err);
          })
      } catch (e) {
        console.log("database - [getClientsPixels] - ERROR -");
        reject(e);
      } finally {
        this.client.close().then(() => {
            console.log("database - [getClientsPixels] - FINISH");
          })
          .catch(err => {
            reject(err.message);
          })
      }
    })
  }

  getClient(body) {
    console.log("database - [getClient] - START");
    return new Promise((resolve, reject) => {
      try {
        const {
          filtro,
          target
        } = body;
        let query = {};
        if (filtro === 'Email cliente') {
          query['email'] = target
        } else if (filtro === 'Pagina pubblicizzata') {
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
              .collection(COLLECTION_CLIENT)
              .findOne(
                query, {
                  sort: {
                    "date": 1
                  }
                }
              )
              .then(result => {
                if (result) {
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
            console.log("database - [getClient] - ERROR -", err);
            reject(err);
          })
      } catch (e) {
        console.log("database - [getClient] - ERROR -", e);
        reject(e);
      } finally {
        this.client.close().then(() => {
            console.log("database - [getClient] - FINISH");
          })
          .catch(err => {
            reject(err);
          })
      }
    })
  }

  getClientsFiltered(body) {
    console.log("database - [getClientsFiltered] - START");
    return new Promise((resolve, reject) => {
      try {
        const {
          filtro
        } = body;
        let optionsProjection = {};
        if (filtro === 'Email cliente') {
          optionsProjection = {
            "_id": 0,
            "url": 0,
            "company": 0,
            "file": 0,
            "row": 0,
            "col": 0,
            "date": 0
          }
        } else if (filtro === 'Pagina pubblicizzata') {
          optionsProjection = {
            "_id": 0,
            "email": 0,
            "company": 0,
            "file": 0,
            "row": 0,
            "col": 0,
            "date": 0
          }
        } else {
          optionsProjection = {
            "_id": 0,
            "email": 0,
            "url": 0,
            "file": 0,
            "row": 0,
            "col": 0,
            "date": 0
          }
        }
        this.initialize();
        this.client
          .connect()
          .then(value => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_CLIENT)
              .find({

              }, {
                sort: {
                  "date": 1
                },
                projection: optionsProjection
              })
              .toArray()
              .then(items => {
                let result = [];
                for (let i in items) {
                  result.push(items[i].email ? items[i].email : items[i].company ? items[i].company : items[i].url ? items[i].url : 'N.D.');
                }
                resolve({
                  valuesList: result
                });
              })
              .catch(err => {
                resolve(err);
              })
          })
          .catch(err => {
            console.log("database - [getClientsFiltered] - ERROR -");
            reject(err);
          })
      } catch (e) {
        console.log("database - [getClientsFiltered] - ERROR -");
        reject(e);
      } finally {
        this.client.close().then(() => {
            console.log("database - [getClientsFiltered] - FINISH");
          })
          .catch(err => {
            reject(err.message);
          })
      }
    })
  }

  editClient(body) {
    console.log("database - [editClient] - START");
    return new Promise((resolve, reject) => {
      try {
        let {
          id,
          email,
          url,
          company,
          file,
          row,
          col
        } = body;
        this.initialize();
        this.client
          .connect()
          .then(result => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_CLIENT)
              .findOne({
                //Converto in mongoDB ObjectID la stringa _id
                "_id": require('mongodb').ObjectID(id)
              }, {})
              .then(result => {
                if (result) {
                  if (file.base64 !== result.file.base64) {
                    ImageBuilder.resize(file, row, col)
                      .then(value => {
                        file = value;
                        Compressor.compressChilkat(file.base64)
                          .then(value => {
                            file.base64 = value;
                            let data = {};
                            let options = {
                              "upsert": false
                            };
                            if (company === '') {
                              data = {
                                "$set": {
                                  "email": email,
                                  "url": url,
                                  "file": file,
                                  "row": row,
                                  "col": col,
                                }
                              }
                              data['$unset'] = {
                                'company': ""
                              };
                            } else {
                              data = {
                                "$set": {
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
                                  .collection(COLLECTION_CLIENT)
                                  .updateOne({
                                    "_id": result['_id']
                                  }, data, options)
                                  .then(value => {
                                    const {
                                      matchedCount,
                                      modifiedCount
                                    } = value;
                                    if (matchedCount && modifiedCount) {
                                      resolve("Dati modificati correttamente")
                                    } else {
                                      reject({
                                        message: "Non e' stato possibile modificare i dati del cliente"
                                      })
                                    }
                                  })
                                  .catch(err => {
                                    console.log("database - [editClient] - ERROR -", err);
                                    reject(err);
                                  })
                              })
                              .catch(err => {
                                console.log("database - [editClient] - ERROR -", err);
                                reject(err);
                              })
                          })
                          .catch(err => {
                            console.log("database - [editClient] - ERROR -", err);
                            reject(err);
                          })
                      })
                      .catch(err => {
                        console.log("database - [editClient] - ERROR -", err);
                        reject(err);
                      })
                  } else {
                    let data = {};
                    let options = {
                      "upsert": false
                    };
                    if (company === '') {
                      data = {
                        "$set": {
                          "email": email,
                          "url": url,
                          "row": row,
                          "col": col,
                        }
                      }
                    } else {
                      data = {
                        "$set": {
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
                          .collection(COLLECTION_CLIENT)
                          .updateOne({
                            "_id": result['_id']
                          }, data, options)
                          .then(value => {
                            const {
                              matchedCount,
                              modifiedCount
                            } = value;
                            if (matchedCount && modifiedCount) {
                              resolve("Dati modificati correttamente")
                            }
                          })
                          .catch(err => {
                            console.log("database - [editClient] - ERROR -", err);
                            reject(err);
                          })
                      })
                      .catch(err => {
                        console.log("database - [editClient] - ERROR -", err);
                        reject(err);
                      })
                  }
                } else {
                  resolve(null);
                }
              })
              .catch(err => {
                console.log("database - [editClient] - ERROR -", err);
                reject(err);
              })
          })
          .catch(err => {
            console.log("database - [editClient] - ERROR -", err);
            reject(err);
          })
      } catch (e) {
        console.log("database - [editClient] - ERROR -", e);
        reject(e)
      } finally {
        this.client.close().then(() => {
            console.log("database - [editClient] - FINISH");
          })
          .catch(err => {
            reject(err.message);
          })
      }
    })
  }

  deleteClient(body) {
    console.log("database - [deleteClient] - START");
    return new Promise((resolve, reject) => {
      try {
        let {
          target
        } = body;
        target = target.split(' - ')[0].trim();
        let query = {
          $or: [{
              email: target
            },
            {
              company: target
            },
          ]
        }
        this.initialize();
        this.client
          .connect()
          .then(() => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_CLIENT)
              .findOne(
                query, {
                  projection: {
                    "_id": 0,
                    "file": 0,
                    "date": 0
                  }
                }
              )
              .then(result => {
                if (result) {
                  let pixel = result;
                  this.client
                    .connect()
                    .then(() => {
                      this.client
                        .db(DB_NAME)
                        .collection(COLLECTION_CLIENT)
                        .deleteOne(pixel)
                        .then(result => {
                          this.client.close().then(() => {
                              if (result.deletedCount === 1) {
                                resolve({
                                  code: 200,
                                  message: "Il cliente e' stata rimossa correttamente"
                                })
                              } else {
                                resolve({
                                  code: 404,
                                  message: "Nessun cliente e' stato trovato con i criteri specificati"
                                })
                              }
                              console.log("database - [deleteClient] - FINISH");
                            })
                            .catch(err => {
                              this.client.close().then(() => {
                                console.log("database - [deleteClient] - ERROR -", err.message);
                                reject(err.message);
                                console.log("database - [deleteClient] - FINISH");
                              })
                            })
                        })
                        .catch(err => {
                          this.client.close().then(() => {
                            console.log("database - [deleteClient] - ERROR -", err.message);
                            resolve({
                              code: 404,
                              message: err.message
                            })
                            console.log("database - [deleteClient] - FINISH");
                          })
                        })
                    })
                } else {
                  this.client.close().then(() => {
                    resolve({
                      code: 404,
                      message: "Cliente inesistente"
                    })
                  })
                }
              })
          })
          .catch(err => {
            this.client.close().then(() => {
              console.log("database - [deleteClient] - ERROR -", err.message);
              reject(err.message);
              console.log("database - [deleteClient] - FINISH");
            })
          })
      } catch (e) {
        this.client.close().then(() => {
          console.log("database - [deleteClient] - ERROR -", e.message);
          reject(e)
          console.log("database - [deleteClient] - FINISH");
        })
      }
    })
  }

  getAdmin(email) {
    console.log("database - [getAdmin] - START");
    return new Promise((resolve, reject) => {
      try {
        this.initialize();
        this.client
          .connect()
          .then(() => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_ADMIN)
              .findOne({
                "email": email,
              }, {
                projection: {
                  "_id": 0,
                }
              })
              .then(result => {
                if (result) {
                  resolve(result);
                } else {
                  resolve(null)
                }
              })
          })
          .catch(err => {
            console.log("database - [getAdmin] - ERROR -", err.message);
            reject(err);
          })
      } catch (e) {
        console.log("database - [getAdmin] - ERROR -", e.message);
        reject(e)
      } finally {
        this.client.close().then(() => {
            console.log("database - [getAdmin] - FINISH");
          })
          .catch(err => {
            reject(err.message);
          })
      }
    })
  }

  getAdmins(type) {
    console.log("database - [getAdmins] - START");
    return new Promise((resolve, reject) => {
      try {
        let query = {};
        if (type === 'Admin') {
          query = {
            "type": 'Basic'
          }
        } else if (type === 'SuperAdmin') {
          query = {
            "type": {
              "$in": ["Admin", "Basic"]
            }
          }
        } else {
          query = {
            "type": {
              "$in": ["Admin", "Basic"]
            }
          }
        }
        this.initialize();
        this.client
          .connect()
          .then(() => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_ADMIN)
              .find(
                query, {
                  projection: {
                    "_id": 0,
                  }
                }
              )
              .toArray()
              .then(result => {
                if (result) {
                  resolve(result);
                } else {
                  resolve(null)
                }
              })
          })
          .catch(err => {
            console.log("database - [getAdmins] - ERROR -", err.message);
            reject(err);
          })
      } catch (e) {
        console.log("database - [getAdmins] - ERROR -", e.message);
        reject(e)
      } finally {
        this.client.close().then(() => {
            console.log("database - [getAdmins] - FINISH");
          })
          .catch(err => {
            reject(err.message);
          })
      }
    })
  }

  login(body) {
    console.log("database - [login] - START");
    return new Promise((resolve, reject) => {
      try {
        const {
          email,
          password
        } = body;
        this.initialize();
        this.client
          .connect()
          .then(() => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_ADMIN)
              .findOne({
                "email": email,
              }, {
                projection: {
                  "_id": 0,
                }
              })
              .then(result => {
                if (result) {
                  bcrypt.compare(password, result.password, function(err, same) {
                    if (err) {
                      reject(new Error("Password is invalid"))
                    } else {
                      if (same) {
                        resolve({
                          code: 200,
                          message: 'Credenziali valide',
                          type: result.type
                        })
                      } else {
                        resolve({
                          code: 404,
                          message: 'Credenziali invalide'
                        })
                      }
                    }
                  });
                } else {
                  resolve({
                    code: 404,
                    message: "User not exist"
                  })
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
        this.client.close().then(() => {
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
    return new Promise((resolve, reject) => {
      try {
        const {
          email,
          password
        } = body;
        this.initialize();
        this.client
          .connect()
          .then(() => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_ADMIN)
              .findOne({
                "email": email,
              }, {
                projection: {
                  "_id": 0,
                }
              })
              .then(result => {
                if (result) {
                  bcrypt.compare(password, result.password, function(err, same) {
                    if (err) {
                      reject({
                        code: 404,
                        message: "Password is invalid"
                      })
                    } else {
                      if (same) {
                        resolve({
                          code: 200,
                          message: 'Cambio password avvenuto con successo'
                        })
                      } else {
                        resolve({
                          code: 404,
                          message: "La password corrente non e' corretta"
                        })
                      }
                    }
                  });
                } else {
                  resolve({
                    code: 404,
                    message: "User not exist"
                  })
                }
              })
          })
          .catch(err => {
            console.log("database - [verifyPassword] - ERROR -", err.message);
            reject({
              code: 404,
              message: err
            });
          })
      } catch (e) {
        console.log("database - [verifyPassword] - ERROR -", e.message);
        reject({
          code: 404,
          message: e.message
        })
      } finally {
        this.client.close().then(() => {
            console.log("database - [verifyPassword] - FINISH");
          })
          .catch(err => {
            reject({
              code: 404,
              message: err.message
            });
          })
      }
    })
  }

  addAdmin(body) {
    console.log("database - [addAdmin] - START");
    return new Promise((resolve, reject) => {
      try {
        let {
          email,
          password,
          type
        } = body;
        this.initialize();
        this.client
          .connect()
          .then(() => {
            this.generateHashedPassword(password)
              .then(result => {
                password = result.hash;
                this.getAdmin(email).then(value => {
                  if (value) {
                    reject(new Error("Admin già esistente"))
                  } else {
                    this.client
                      .connect()
                      .then(() => {
                        this.client
                          .db(DB_NAME)
                          .collection(COLLECTION_ADMIN)
                          .insertOne({
                            "email": email,
                            "password": password,
                            "type": type
                          })
                          .then(value => {
                            resolve({
                              code: 200,
                              message: "Admin inserito correttamente"
                            })
                          })
                          .catch(err => {
                            console.log("database - [addAdmin] - ERROR -", err);
                            reject(err);
                          })
                      })
                      .catch(err => {
                        console.log("database - [addAdmin] - ERROR -", err);
                        reject(err);
                      })
                  }
                })
              })
              .catch(err => {
                console.log("database - [addAdmin] - ERROR -", err);
                reject(err);
              })
          })
          .catch(err => {
            console.log("database - [addAdmin] - ERROR -", err.message);
            reject(err);
          })
      } catch (e) {
        console.log("database - [addAdmin] - ERROR -", e);
        reject(e)
      } finally {
        this.client.close().then(() => {
            console.log("database - [addAdmin] - FINISH");
          })
          .catch(err => {
            reject(err.message);
          })
      }
    })
  }

  deleteAdmin(body) {
    console.log("database - [deleteAdmin] - START");
    return new Promise((resolve, reject) => {
      try {
        var {
          email
        } = body;
        email = email.split('-')[0].trim();
        this.initialize();
        this.client
          .connect()
          .then(() => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_ADMIN)
              .findOne({
                "email": email,
              }, {
                projection: {
                  "_id": 0,
                }
              })
              .then(result => {
                if (result) {
                  let user = {
                    "email": email
                  };
                  this.client
                    .connect()
                    .then(() => {
                      this.client
                        .db(DB_NAME)
                        .collection(COLLECTION_ADMIN)
                        .deleteOne(user)
                        .then(result => {
                          if (result.deletedCount === 1) {
                            resolve({
                              code: 200,
                              message: "L'admin e' stato rimosso correttamente"
                            })
                          } else {
                            resolve({
                              code: 404,
                              message: "Non e' stato trovato alcun admin"
                            })
                          }
                        })
                        .catch(err => {
                          console.log(err);
                          resolve({
                            code: 404,
                            message: err.message
                          })
                        })
                    })
                } else {
                  resolve({
                    code: 404,
                    message: "Admin inesistente"
                  })
                }
              })
          })
          .catch(err => {
            console.log("database - [deleteAdmin] - ERROR -", err.message);
            reject(err);
          })
      } catch (e) {
        console.log("database - [deleteAdmin] - ERROR -", e.message);
        reject(e)
      } finally {
        this.client.close().then(() => {
            console.log("database - [deleteAdmin] - FINISH");
          })
          .catch(err => {
            reject(err.message);
          })
      }
    })
  }

  countPixels() {
    console.log("database - [countPixel] - START");
    return new Promise((resolve, reject) => {
      try {
        this.initialize();
        this.client
          .connect()
          .then(value => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_CLIENT)
              .find({

              }, {
                sort: {
                  "date": 1
                },
                projection: {
                  "_id": 0,
                  "email": 0,
                  "company": 0,
                  "date": 0,
                  "file": 0,
                  "url": 0
                }
              })
              .toArray()
              .then(items => {
                let pixelRemaining = 0;
                for (let i in items) {
                  pixelRemaining += (items[i].col * items[i].row);
                }
                resolve(40128 - pixelRemaining);
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
        this.client.close().then(() => {
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
        const {
          email
        } = body;
        this.initialize();
        this.client
          .connect()
          .then(() => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_ADMIN)
              .findOne({
                "email": email
              }, {
                projection: {
                  "_id": 0,
                  "password": 0
                }
              })
              .then(result => {
                if (result) {
                  this.generatePassword()
                    .then(password => {
                      const filter = {
                        "email": email
                      };
                      const updateDoc = {
                        $set: {
                          "password": password.hash
                        },
                      };
                      const options = {
                        upsert: false
                      };
                      this.client
                        .db(DB_NAME)
                        .collection(COLLECTION_ADMIN)
                        .updateOne(filter, updateDoc, options)
                        .then(value => {
                          resolve(password.real);
                        })
                        .catch(err => {
                          reject(err);
                        })
                    })
                } else {
                  // resolve({code:404, message:"Email inserted not exist"})
                  this.resetPasswordClient(body)
                    .then(result => {
                      resolve(result);
                    })
                    .catch(err => {
                      reject(err);
                    })
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
        const {
          password
        } = body.body;
        const email = body.email;
        this.initialize();
        this.client
          .connect()
          .then(value => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_ADMIN)
              .findOne({
                "email": email,
              }, {
                projection: {
                  "_id": 0,
                }
              })
              .then(value => {
                if (value) {
                  const filter = {
                    "email": email
                  };
                  this.generateHashedPassword(password)
                    .then(result => {
                      let confirmPasswordHashed = result.hash;
                      const updateDoc = {
                        $set: {
                          "password": confirmPasswordHashed
                        },
                      };
                      const options = {
                        upsert: false
                      };
                      this.client
                        .db(DB_NAME)
                        .collection(COLLECTION_ADMIN)
                        .updateOne(filter, updateDoc, options)
                        .then(value => {
                          resolve(password);
                        })
                        .catch(err => {
                          reject(err);
                        })
                    })
                } else {
                  // reject(new Error("Password inserted is wrong"))
                  this.changePasswordClient(body)
                    .then(result => {
                      resolve(result)
                    })
                    .catch(err => {
                      reject(err);
                    })
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

  changePasswordClient(body) {
    console.log("database - [changePasswordClient] - START");
    return new Promise((resolve, reject) => {
      try {
        const {
          password
        } = body.body;
        const email = body.email;
        this.initialize();
        this.client
          .connect()
          .then(value => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_USER)
              .findOne({
                "email": email,
              }, {
                projection: {
                  "_id": 0,
                }
              })
              .then(value => {
                if (value) {
                  const filter = {
                    "email": email
                  };
                  this.generateHashedPassword(password)
                    .then(result => {
                      let confirmPasswordHashed = result.hash;
                      const updateDoc = {
                        $set: {
                          "password": confirmPasswordHashed
                        },
                      };
                      const options = {
                        upsert: false
                      };
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
                console.log("database - [changePasswordClient] - ERROR", err.message);
                reject(err);
              })
          })
      } catch (e) {
        console.log("database - [changePasswordClient] - ERROR", e.message);
        reject(e);
      } finally {
        this.client.close().then(() => {
            console.log("database - [changePasswordClient] - FINISH");
          })
          .catch(err => {
            reject(err.message);
          })
      }
    })
  }

  resetPasswordClient(body) {
    console.log("database - [resetPasswordClient] - START");
    return new Promise((resolve, reject) => {
      try {
        const {
          email
        } = body;
        this.initialize();
        this.client
          .connect()
          .then(() => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_USER)
              .findOne({
                "email": email
              }, {
                projection: {
                  "_id": 0,
                  "password": 0
                }
              })
              .then(result => {
                if (result) {
                  this.generatePassword()
                    .then(password => {
                      const filter = {
                        "email": email
                      };
                      const updateDoc = {
                        $set: {
                          "password": password.hash
                        },
                      };
                      const options = {
                        upsert: false
                      };
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
                  resolve({
                    code: 404,
                    message: "Email inserted not exist"
                  })
                }
              })
              .catch(err => {
                reject(err);
              })
          }).catch(err => {
            console.log("database - [resetPasswordClient] - ERROR", err.message);
            reject(err);
          })
      } catch (e) {
        console.log("database - [resetPasswordClient] - ERROR", e.message);
        reject(e);
      } finally {
        this.client.close().then(() => {
            console.log("database - [resetPasswordClient] - FINISH");
          })
          .catch(err => {
            reject(err.message);
          })
      }
    })
  }

  getUser(email, username = null) {
    console.log("database - [getUser] - START");
    return new Promise((resolve, reject) => {
      try {
        let query = {
          "email": email
        }
        if (username) {
          query.username = username;
        }
        this.initialize();
        this.client
          .connect()
          .then(() => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_USER)
              .findOne(
                query, {
                  projection: {
                    "_id": 0,
                  }
                }
              )
              .then(result => {
                if (result) {
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
        this.client.close().then(() => {
            console.log("database - [getUser] - FINISH");
          })
          .catch(err => {
            reject(err.message);
          })
      }
    })
  }

  loginUser(body) {
    console.log("database - [loginUser] - START");
    return new Promise((resolve, reject) => {
      try {
        const {
          email,
          password
        } = body;
        this.initialize();
        this.client
          .connect()
          .then(() => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_USER)
              .findOne({
                "$and": [{
                  "$or": [{
                    "email": email
                  }, {
                    "username": email,
                  }]
                }, {
                  "active": true,
                }]
              }, {
                projection: {
                  "_id": 0,
                }
              })
              .then(result => {
                if (result) {
                  bcrypt.compare(password, result.password, function(err, same) {
                    if (err) {
                      reject(new Error("Password is invalid"))
                    } else {
                      if (same) {
                        resolve({
                          code: 200,
                          message: 'Credenziali valide',
                          type: result.type
                        })
                      } else {
                        resolve({
                          code: 404,
                          message: 'Credenziali invalide'
                        })
                      }
                    }
                  });
                } else {
                  resolve({
                    code: 404,
                    message: "User inesistente"
                  })
                }
              })
          })
          .catch(err => {
            console.log("database - [loginUser] - ERROR -", err.message);
            reject(err);
          })
      } catch (e) {
        console.log("database - [loginUser] - ERROR -", e.message);
        reject(e)
      } finally {
        this.client.close().then(() => {
            console.log("database - [loginUser] - FINISH");
          })
          .catch(err => {
            reject(err.message);
          })
      }
    })
  }

  saveUser(body) {
    console.log("database - [saveUser] - START");
    return new Promise((resolve, reject) => {
      try {
        let {
          username,
          email,
          password
        } = body;
        let user = '';
        this.initialize();
        this.client
          .connect()
          .then(() => {
            this.generateHashedPassword(password)
              .then(result => {
                password = result.hash;
                this.getUser(email, username).then(value => {
                  if (value) {
                    if (value.username !== username && value.email === email) {
                      reject(new Error("Username già esistente"));
                    } else if (value.username === username && value.email === email) {
                      reject(new Error("Utente già esistente"))
                    } else {
                      reject(new Error("Impossibile salvare l'utente"))
                    }
                  } else {
                    crypto.randomBytes(20, (err, buf) => {
                      user = {
                        "_id": new this.ObjectID(),
                        "username": username,
                        "email": email,
                        "password": password,
                        "type": 'Client',
                        "active": false,
                        "activeExpires": Date.now() + (3600 * 1000),
                      }
                      user.activeToken = user._id.id.toString('hex') + buf.toString('hex');
                    })
                    this.client
                      .connect()
                      .then(() => {
                        this.client
                          .db(DB_NAME)
                          .collection(COLLECTION_USER)
                          .insertOne(user)
                          .then(value => {
                            resolve({
                              code: 200,
                              message: "L'email con il link di attivazione è stata inviata. Scadra' entro un ora",
                              activeToken: user.activeToken,
                              email: user.email,
                              username: user.username
                            })
                          })
                          .catch(err => {
                            console.log("database - [saveUser] - ERROR -", err);
                            reject(err);
                          })
                      })
                      .catch(err => {
                        console.log("database - [saveUser] - ERROR -", err);
                        reject(err);
                      })
                  }
                })
              })
              .catch(err => {
                console.log("database - [saveUser] - ERROR -", err);
                reject(err);
              })
          })
          .catch(err => {
            console.log("database - [saveUser] - ERROR -", err.message);
            reject(err);
          })
      } catch (e) {
        console.log("database - [saveUser] - ERROR -", e);
        reject(e)
      } finally {
        this.client.close().then(() => {
            console.log("database - [saveUser] - FINISH");
          })
          .catch(err => {
            reject(err.message);
          })
      }
    })
  }

  activeUser(activeToken) {
    console.log("database - [activeUser] - START");
    return new Promise((resolve, reject) => {
      try {
        let user = {
          "activeToken": activeToken.activeToken,
          "active": false,
          "activeExpires": {
            "$gt": Date.now()
          }
        };
        this.initialize();
        this.client
          .connect()
          .then(() => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_USER)
              .findOne(user)
              .then(value => {
                if (value) {
                  let data = {
                    "$set": {
                      "active": true
                    },
                    '$unset': {
                      'activeExpires': "",
                      'activeToken': ""
                    }
                  }
                  let options = {
                    "upsert": false,
                  };
                  this.client
                    .db(DB_NAME)
                    .collection(COLLECTION_USER)
                    .updateOne({
                      "_id": value['_id']
                    }, data, options)
                    .then(value => {
                      const {
                        matchedCount,
                        modifiedCount
                      } = value;
                      if (matchedCount && modifiedCount) {
                        resolve(true)
                      } else {
                        resolve(false);
                      }
                    })
                    .catch(err => {
                      console.log("database - [activeUser] - ERROR -", err);
                      reject(err);
                    })
                } else {
                  this.client
                    .db(DB_NAME)
                    .collection(COLLECTION_USER)
                    .findOne({
                      "activeToken": user.activeToken,
                      "active": false,
                      "$and": [{
                        "active": false
                      }, {
                        "activeExpires": {
                          "$lt": Date.now()
                        }
                      }]
                    })
                    .then(result => {
                      if (result) {
                        this.client
                          .db(DB_NAME)
                          .collection(COLLECTION_USER)
                          .deleteOne({
                            "_id": result._id
                          })
                          .then(result => {
                            if (result.deletedCount === 1) {
                              resolve(false)
                            } else {
                              resolve(false)
                            }
                          })
                          .catch(err => {
                            reject(new Error("non e' stato possibile eliminare l'utente"))
                          })
                      } else {
                        resolve(false);
                      }
                    })
                    .catch(err => {
                      reject(err);
                    })
                }
              })
              .catch(err => {
                console.log("database - [activeUser] - ERROR -", err);
                reject(err);
              })
          })
          .catch(err => {
            console.log("database - [activeUser] - ERROR -", err.message);
            reject(err);
          })
      } catch (e) {
        console.log("database - [activeUser] - ERROR -", e);
        reject(e)
      } finally {
        this.client.close().then(() => {
            console.log("database - [activeUser] - FINISH");
          })
          .catch(err => {
            reject(err.message);
          })
      }
    })
  }

  saveClick(emailClient, urlClicked) {
    console.log("database - [saveClick] - START");
    return new Promise((resolve, reject) => {
      try {
        this.initialize();
        this.client
          .connect()
          .then(() => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_ADMIN)
              .findOne({
                "email": emailClient,
              }, {
                projection: {
                  "_id": 0,
                }
              })
              .then(result => {
                if (result) {
                  resolve("Click non salvato poiche' l'utente loggato e' un admin/partner")
                } else {
                  this.client
                    .db(DB_NAME)
                    .collection(COLLECTION_CLICK)
                    .findOne({
                      "email": emailClient,
                    }, {
                      projection: {
                        "_id": 0,
                      }
                    })
                    .then(result => {
                      if (result) {
                        if (!result.urls.includes(urlClicked)) {
                          let urls = result.urls;
                          urls.push(urlClicked);
                          this.client
                          .connect()
                          .then(() => {
                            this.client
                              .db(DB_NAME)
                              .collection(COLLECTION_CLICK)
                              .updateOne({
                                "email": emailClient,
                              }, {
                                "$set": {
                                  "urls": urls
                                }
                              }, {
                                "upsert": false
                              })
                              .then(value => {
                                const {
                                  matchedCount,
                                  modifiedCount
                                } = value;
                                if (matchedCount && modifiedCount) {
                                  resolve("Click salvato")
                                }
                              })
                              .catch(err => {
                                console.log("database - [saveClick] - ERROR -", err);
                              })
                          })
                          .catch(err => {
                            console.log("database - [saveClick] - ERROR -", err);
                          })
                      }
                      resolve('Click già presente')
                    } else {
                      let urls = [];
                      urls.push(urlClicked);
                      this.client
                      .connect()
                      .then(() => {
                        this.client
                          .db(DB_NAME)
                          .collection(COLLECTION_CLICK)
                          .insertOne({
                            "email": emailClient,
                            "urls": urls,
                          })
                          .then(value => {
                            resolve("Click salvato")
                          })
                          .catch(err => {
                            console.log("database - [saveClick] - ERROR -", err);
                            reject(err);
                          })
                      })
                      .catch(err => {
                        console.log("database - [saveClick] - ERROR -", err);
                        reject(err);
                      })
                    }
                  })
                  .catch(err => {
                    reject(new Error("Impossibile salvare il click"))
                  })
                }
              })
              .catch(err => {
                reject(new Error("Impossibile verificare l'utente loggato"))
              })
          })
          .catch(err => {
            console.log("database - [saveClick] - ERROR -", err);
            reject(err);
          })
      } catch (e) {
        console.log("database - [saveClick] - ERROR -", e);
        reject(e)
      } finally {
        this.client.close().then(() => {
            console.log("database - [saveClick] - FINISH");
          })
          .catch(err => {
            reject(err.message);
          })
      }
    })
  }

  deleteUser(body) {
    console.log("database - [deleteUser] - START");
    return new Promise((resolve, reject) => {
      try {
        var {
          email
        } = body;
        this.initialize();
        this.client
          .connect()
          .then(() => {
            this.client
              .db(DB_NAME)
              .collection(COLLECTION_USER)
              .findOne({
                "$and": [{
                  "$or": [{
                    "email": email
                  }, {
                    "username": email,
                  }]
                }, {
                  "active": true,
                }]
              })
              .then(result => {
                if (result) {
                  let user = {
                    "_id": result._id
                  }
                  this.client
                    .connect()
                    .then(() => {
                      this.client
                        .db(DB_NAME)
                        .collection(COLLECTION_USER)
                        .deleteOne(user)
                        .then(result => {
                          if (result.deletedCount === 1) {
                            resolve({
                              code: 200,
                              message: "L'utente e' stato rimosso correttamente"
                            })
                          } else {
                            resolve({
                              code: 404,
                              message: "Non e' stato trovato alcun utente"
                            })
                          }
                        })
                        .catch(err => {
                          console.log(err);
                          resolve({
                            code: 404,
                            message: err.message
                          })
                        })
                    })
                } else {
                  resolve({
                    code: 404,
                    message: "Utente inesistente"
                  })
                }
              })
              .catch(err=> {
                console.log("database - [deleteUser - findUser] - ERROR -", err.message);
                resolve({
                  code: 404,
                  message: "Non e' stato trovato alcun utente"
                })
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
        this.client.close().then(() => {
            console.log("database - [deleteUser] - FINISH");
          })
          .catch(err => {
            reject(err.message);
          })
      }
    })
  }

}


module.exports = MongoDB;
