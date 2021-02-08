const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Compressor = require('./compressionUtil');
const ImageBuilder = require('./imageUtil');
const COLLECTION_ADMIN = '_admin';
const COLLECTION_USER = '_user';
const COLLECTION_CLICK = '_click';
const COLLECTION_CLIENT = '_client';
const SALT_ROUNDS = 10;

class MainService {
  constructor() {
    this.db = null;
    this.ObjectID = require('mongodb').ObjectID;
  }

  initialize(db) {
    if(this.db === null) {
      this.db = db
    }
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
            console.log("mainService - [generateHashedPassword] - ERROR -", err.message);
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
    console.log("mainService - [saveClient] - START");
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
                this.db
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
                      this.db
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
                          console.log("mainService - [saveClient] - ERROR -", err);
                          reject(err);
                        })
                    }
                  })
                  .catch(err => {
                    console.log("mainService - [saveClient] - ERROR -", err);
                    reject(err);
                  });
              })
          })
          .catch(err => {
            reject(err);
          })
      } catch (e) {
        console.log("mainService - [saveClient] - ERROR -", e);
        reject(e)
      } finally {
        console.log("mainService - [saveClient] - FINISH");
      }
    })
  }

  getClientsPixels() {
    console.log("mainService - [getClientsPixels] - START");
    return new Promise((resolve, reject) => {
      try {
        this.db
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
                    console.log("mainService - [getClientsPixels] - ERROR -", err.message);
                    reject(err);
                  })
              })
              .catch(err => {
                console.log("mainService - [getClientsPixels] - ERROR -", err.message);
                reject(err);
              })
          })
      } catch (e) {
        console.log("mainService - [getClientsPixels] - ERROR -", e.message);
        reject(e);
      } finally {
        console.log("mainService - [getClientsPixels] - FINISH");
      }
    })
  }

  getClient(body) {
    console.log("mainService - [getClient] - START");
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
        this.db
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
      } catch (e) {
        console.log("mainService - [getClient] - ERROR -", e);
        reject(e);
      } finally {
        console.log("mainService - [getClient] - FINISH");
      }
    })
  }

  getClientsFiltered(body) {
    console.log("mainService - [getClientsFiltered] - START");
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
        this.db
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
      } catch (e) {
        console.log("mainService - [getClientsFiltered] - ERROR -");
        reject(e);
      } finally {
        console.log("mainService - [getClientsFiltered] - FINISH");
      }
    })
  }

  editClient(body) {
    console.log("mainService - [editClient] - START");
    return new Promise((resolve, reject) => {
      try {
        let {
          id,
          email,
          url,
          company,
          file,
          row,
          col,
          positionRow,
          positionCol
        } = body;
        this.db
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
                          if (positionRow === '' && positionCol === '') {
                            data = {
                              "$set": {
                                "email": email,
                                "url": url,
                                "file": file,
                                "row": row,
                                "col": col,
                                "date": new Date(),
                              }
                            }
                            if(result.positionRow) {
                              data['$unset'] = {
                                'positionRow': '',
                                'positionCol': ''
                              }
                            }
                          } else if (positionRow === '' && positionCol !== '') {
                            data = {
                              "$set": {
                                "email": email,
                                "url": url,
                                "file": file,
                                "row": row,
                                "col": col,
                                "positionRow": 0,
                                "positionCol": (+positionCol) - 1,
                                "date": new Date(),
                              }
                            }
                          } else if (positionRow !== '' && positionCol === '') {
                            data = {
                              "$set": {
                                "email": email,
                                "url": url,
                                "file": file,
                                "row": row,
                                "col": col,
                                "positionRow": (+positionRow) - 1,
                                "positionCol": 0,
                                "date": new Date(),
                              }
                            }
                          } else {
                            data = {
                              "$set": {
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
                          }
                          if(data['$unset']) {
                            data['$unset'].company = '';
                          } else {
                            data['$unset'] = {
                              'company': ""
                            };
                          }
                        } else {
                          if (positionRow === '' && positionCol === '') {
                            data = {
                              "$set": {
                                "email": email,
                                "url": url,
                                "company": company,
                                "file": file,
                                "row": row,
                                "col": col,
                                "date": new Date(),
                              }
                            }
                            if(result.positionRow) {
                              data['$unset'] = {
                                'positionRow': '',
                                'positionCol': ''
                              }
                            }
                          } else if (positionRow === '' && positionCol !== '') {
                            data = {
                              "$set": {
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
                            }
                          } else if (positionRow !== '' && positionCol === '') {
                            data = {
                              "$set": {
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
                            }
                          } else {
                            data = {
                              "$set": {
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
                        }
                        this.db
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
                            console.log("mainService - [editClient] - ERROR -", err);
                            reject(err);
                          })
                      })
                      .catch(err => {
                        console.log("mainService - [editClient] - ERROR -", err);
                        reject(err);
                      })
                  })
                  .catch(err => {
                    console.log("mainService - [editClient] - ERROR -", err);
                    reject(err);
                  })
              } else {
                let data = {};
                let options = {
                  "upsert": false
                };
                if (company === '') {
                  if (positionRow === '' && positionCol === '') {
                    data = {
                      "$set": {
                        "email": email,
                        "url": url,
                        "row": row,
                        "col": col,
                        "date": new Date(),
                      }
                    }
                    if(result.positionRow) {
                      data['$unset'] = {
                        'positionRow': '',
                        'positionCol': ''
                      }
                    }
                  } else if (positionRow === '' && positionCol !== '') {
                    data = {
                      "$set": {
                        "email": email,
                        "url": url,
                        "row": row,
                        "col": col,
                        "positionRow": 0,
                        "positionCol": (+positionCol) - 1,
                        "date": new Date(),
                      }
                    }
                  } else if (positionRow !== '' && positionCol === '') {
                    data = {
                      "$set": {
                        "email": email,
                        "url": url,
                        "row": row,
                        "col": col,
                        "positionRow": (+positionRow) - 1,
                        "positionCol": 0,
                        "date": new Date(),
                      }
                    }
                  } else {
                    data = {
                      "$set": {
                        "email": email,
                        "url": url,
                        "row": row,
                        "col": col,
                        "positionRow": (+positionRow) - 1,
                        "positionCol": (+positionCol) - 1,
                        "date": new Date(),
                      }
                    }
                  }
                  if(data['$unset']) {
                    data['$unset'].company = '';
                  } else {
                    data['$unset'] = {
                      'company': ""
                    };
                  }
                } else {
                  if (positionRow === '' && positionCol === '') {
                    data = {
                      "$set": {
                        "email": email,
                        "url": url,
                        "company": company,
                        "row": row,
                        "col": col,
                        "date": new Date(),
                      }
                    }
                    if(result.positionRow) {
                      data['$unset'] = {
                        'positionRow': '',
                        'positionCol': ''
                      }
                    }
                  } else if (positionRow === '' && positionCol !== '') {
                    data = {
                      "$set": {
                        "email": email,
                        "url": url,
                        "company": company,
                        "row": row,
                        "col": col,
                        "positionRow": 0,
                        "positionCol": (+positionCol) - 1,
                        "date": new Date(),
                      }
                    }
                  } else if (positionRow !== '' && positionCol === '') {
                    data = {
                      "$set": {
                        "email": email,
                        "url": url,
                        "company": company,
                        "row": row,
                        "col": col,
                        "positionRow": (+positionRow) - 1,
                        "positionCol": 0,
                        "date": new Date(),
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
                        "positionRow": (+positionRow) - 1,
                        "positionCol": (+positionCol) - 1,
                        "date": new Date(),
                      }
                    }
                  }
                }
                this.db
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
                    console.log("mainService - [editClient] - ERROR -", err);
                    reject(err);
                  })
              }
            } else {
              resolve(null);
            }
          })
          .catch(err => {
            console.log("mainService - [editClient] - ERROR -", err);
            reject(err);
          })
      } catch (e) {
        console.log("mainService - [editClient] - ERROR -", e);
        reject(e)
      } finally {
        console.log("mainService - [editClient] - FINISH");
      }
    })
  }

  deleteClient(body) {
    console.log("mainService - [deleteClient] - START");
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
        this.db
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
              this.db
                .collection(COLLECTION_CLIENT)
                .deleteOne(pixel)
                .then(result => {
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
                })
                .catch(err => {
                  console.log("mainService - [deleteClient] - ERROR -", err.message);
                  resolve({
                    code: 404,
                    message: err.message
                  })
                })
            } else {
              resolve({
                code: 404,
                message: "Cliente inesistente"
              })
            }
          })
          .catch(err => {
            console.log("mainService - [deleteClient] - ERROR -", err.message);
            resolve({
              code: 404,
              message: err.message
            })
          })
      } catch (e) {
        console.log("mainService - [deleteClient] - ERROR -", e.message);
        reject(e)
      } finally {
        console.log("mainService - [deleteClient] - FINISH");
      }
    })
  }

  getAdmin(email) {
    console.log("mainService - [getAdmin] - START");
    return new Promise((resolve, reject) => {
      try {
        this.db
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
      } catch (e) {
        console.log("mainService - [getAdmin] - ERROR -", e.message);
        reject(e)
      } finally {
        console.log("mainService - [getAdmin] - FINISH");
      }
    })
  }

  getAdmins(type) {
    console.log("mainService - [getAdmins] - START");
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
        this.db
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
      } catch (e) {
        console.log("mainService - [getAdmins] - ERROR -", e.message);
        reject(e)
      } finally {
        console.log("mainService - [getAdmins] - FINISH");
      }
    })
  }

  login(body) {
    console.log("mainService - [login] - START");
    return new Promise((resolve, reject) => {
      try {
        const {
          email,
          password
        } = body;
        this.db
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
                  reject(new Error("Password non valida"))
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
                message: "Utente inesistente"
              })
            }
          })
      } catch (e) {
        console.log("mainService - [login] - ERROR -", e.message);
        reject(e)
      } finally {
        console.log("mainService - [login] - FINISH");
      }
    })
  }

  verifyPassword(body) {
    console.log("mainService - [verifyPassword] - START");
    return new Promise((resolve, reject) => {
      try {
        const {
          email,
          password
        } = body;
        this.db
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
                    message: "Password invalida"
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
              this.db
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
                      reject({
                        code: 404,
                        message: "Password invalida"
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
                }
              })
              .catch(err => {
                throw err;
              })
            }
          })
          .catch(err => {
            throw err;
          })
      } catch (e) {
        console.log("mainService - [verifyPassword] - ERROR -", e.message);
        reject({
          code: 404,
          message: e.message
        })
      } finally {
        console.log("mainService - [verifyPassword] - FINISH");
      }
    })
  }

  addAdmin(body) {
    console.log("mainService - [addAdmin] - START");
    return new Promise((resolve, reject) => {
      try {
        let {
          email,
          password,
          type
        } = body;
        this.generateHashedPassword(password)
          .then(result => {
            password = result.hash;
            this.getAdmin(email).then(value => {
              if (value) {
                reject(new Error("Admin già esistente"))
              } else {
                this.db
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
                    console.log("mainService - [addAdmin] - ERROR -", err);
                    reject(err);
                  })
              }
            })
          })
          .catch(err => {
            console.log("mainService - [addAdmin] - ERROR -", err);
            reject(err);
          })
      } catch (e) {
        console.log("mainService - [addAdmin] - ERROR -", e);
        reject(e)
      } finally {
        console.log("mainService - [addAdmin] - FINISH");
      }
    })
  }

  deleteAdmin(body) {
    console.log("mainService - [deleteAdmin] - START");
    return new Promise((resolve, reject) => {
      try {
        var {
          email
        } = body;
        email = email.split('-')[0].trim();
        this.db
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
              this.db
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
            } else {
              resolve({
                code: 404,
                message: "Admin inesistente"
              })
            }
          })
      } catch (e) {
        console.log("mainService - [deleteAdmin] - ERROR -", e.message);
        reject(e)
      } finally {
        console.log("mainService - [deleteAdmin] - FINISH");
      }
    })
  }

  countPixels() {
    console.log("mainService - [countPixel] - START");
    return new Promise((resolve, reject) => {
      try {
        this.db
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
            console.log("mainService - [countPixel] - ERROR -", err.message);
            reject(err);
          })
      } catch (e) {
        console.log("mainService - [countPixel] - ERROR -", e.message);
        reject(e);
      } finally {
        console.log("mainService - [countPixel] - FINISH");
      }
    })
  }

  resetPassword(body) {
    console.log("mainService - [resetPassword] - START");
    return new Promise((resolve, reject) => {
      try {
        const {
          email
        } = body;
        this.db
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
                  this.db
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
      } catch (e) {
        console.log("mainService - [resetPassword] - ERROR", e.message);
        reject(e);
      } finally {
        console.log("mainService - [resetPassword] - FINISH");
      }
    })
  }

  changePassword(body) {
    console.log("mainService - [changePassword] - START");
    return new Promise((resolve, reject) => {
      try {
        const {
          password
        } = body.body;
        const email = body.email;
        this.db
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
                  this.db
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
            console.log("mainService - [changePassword] - ERROR", err.message);
            reject(err);
          })
      } catch (e) {
        console.log("mainService - [changePassword] - ERROR", e.message);
        reject(e);
      } finally {
        console.log("mainService - [changePassword] - FINISH");
      }
    })
  }

  changePasswordClient(body) {
    console.log("mainService - [changePasswordClient] - START");
    return new Promise((resolve, reject) => {
      try {
        const {
          password
        } = body.body;
        const email = body.email;
        this.db
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
          .then(value => {
            if (value) {
              const filter = {
                "email": value.email
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
                  this.db
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
              reject(new Error("Password invalida"))
            }
          })
          .catch(err => {
            console.log("mainService - [changePasswordClient] - ERROR", err.message);
            reject(err);
          })
      } catch (e) {
        console.log("mainService - [changePasswordClient] - ERROR", e.message);
        reject(e);
      } finally {
        console.log("mainService - [changePasswordClient] - FINISH");
      }
    })
  }

  resetPasswordClient(body) {
    console.log("mainService - [resetPasswordClient] - START");
    return new Promise((resolve, reject) => {
      try {
        const {
          email
        } = body;
        this.db
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
                  this.db
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
                message: "Email inesistente"
              })
            }
          })
          .catch(err => {
            reject(err);
          })
      } catch (e) {
        console.log("mainService - [resetPasswordClient] - ERROR", e.message);
        reject(e);
      } finally {
        console.log("mainService - [resetPasswordClient] - FINISH");
      }
    })
  }

  getUser(email, username = null) {
    console.log("mainService - [getUser] - START");
    return new Promise((resolve, reject) => {
      try {
        let query = {}
        query = {
          "$and": [{
            "$or": [{
              "email": email
            }, {
              "username": username ? username : email,
            }]
          }]
        }
        this.db
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
          .catch(err => {
            console.log("mainService - [getUser] - ERROR -", err.message);
            reject(err)
          })
      } catch (e) {
        console.log("mainService - [getUser] - ERROR -", e.message);
        reject(e)
      } finally {
        console.log("mainService - [getUser] - FINISH");
      }
    })
  }

  loginUser(body) {
    console.log("mainService - [loginUser] - START");
    return new Promise((resolve, reject) => {
      try {
        const {
          email,
          password
        } = body;
        this.db
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
                  reject(new Error("Password invalida"))
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
                message: "Utente inesistente"
              })
            }
          })
      } catch (e) {
        console.log("mainService - [loginUser] - ERROR -", e.message);
        reject(e)
      } finally {
        console.log("mainService - [loginUser] - FINISH");
      }
    })
  }

  saveUser(body) {
    console.log("mainService - [saveUser] - START");
    return new Promise((resolve, reject) => {
      try {
        let {
          username,
          email,
          password
        } = body;
        let user = '';
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
                  user["activeToken"] = user._id.id.toString('hex') + buf.toString('hex');
                  this.db
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
                    console.log("mainService - [saveUser] - ERROR -", err);
                    reject(err);
                  })
                })
              }
            })
          })
          .catch(err => {
            console.log("mainService - [saveUser] - ERROR -", err);
            reject(err);
          })
      } catch (e) {
        console.log("mainService - [saveUser] - ERROR -", e);
        reject(e)
      } finally {
        console.log("mainService - [saveUser] - FINISH");
      }
    })
  }

  activeUser(activeToken) {
    console.log("mainService - [activeUser] - START");
    return new Promise((resolve, reject) => {
      try {
        let user = {
          "activeToken": activeToken.activeToken,
          "active": false,
          "activeExpires": {
            "$gt": Date.now()
          }
        };
        this.db
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
              this.db
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
                  console.log("mainService - [activeUser] - ERROR -", err);
                  reject(err);
                })
            } else {
              this.db
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
                    this.db
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
            console.log("mainService - [activeUser] - ERROR -", err);
            reject(err);
          })
      } catch (e) {
        console.log("mainService - [activeUser] - ERROR -", e);
        reject(e)
      } finally {
        console.log("mainService - [activeUser] - FINISH");
      }
    })
  }

  saveClick(emailClient, urlClicked) {
    console.log("mainService - [saveClick] - START");
    return new Promise((resolve, reject) => {
      try {
        if(!emailClient) {
          resolve("Click non salvato poiche' non è un utente loggato");
        }
        this.db
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
              this.db
              .collection(COLLECTION_USER)
              .findOne({
                "$and": [{
                  "$or": [{
                    "email": emailClient
                  }, {
                    "username": emailClient,
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
                if(result) {
                  this.db
                  .collection(COLLECTION_CLICK)
                  .findOne({
                    "email": result.email,
                  }, {
                    projection: {
                      "_id": 0,
                    }
                  })
                  .then(result1 => {
                    if (result1) {
                      if (!result1.urls.includes(urlClicked)) {
                        let urls = result1.urls;
                        urls.push(urlClicked);
                        this.db
                        .collection(COLLECTION_CLICK)
                        .updateOne({
                          "email": result1.email,
                          "username": result1.username
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
                          console.log("mainService - [saveClick] - ERROR -", err);
                          reject(err);
                        })
                      }
                      resolve('Click già presente')
                    } else {
                      let urls = [];
                      urls.push(urlClicked);
                      this.db
                      .collection(COLLECTION_CLICK)
                      .insertOne({
                        "email": result.email,
                        "username": result.username,
                        "urls": urls,
                      })
                      .then(value => {
                        resolve("Click salvato")
                      })
                      .catch(err => {
                        console.log("mainService - [saveClick] - ERROR -", err);
                        reject(err);
                      })
                    }
                  })
                  .catch(err => {
                    reject(new Error("Impossibile salvare il click"))
                  })
                } else {
                  console.log("mainService - [saveClick] - ERROR - Utente non trovato");
                  reject({message:"Utente non trovato"});
                }
              })
              .catch(err => {
                console.log("mainService - [saveClick] - ERROR -", err);
                reject(err);
              })
            }
          })
          .catch(err => {
            reject(new Error("Impossibile verificare l'utente loggato"))
          })
      } catch (e) {
        console.log("mainService - [saveClick] - ERROR -", e);
        reject(e)
      } finally {
        console.log("mainService - [saveClick] - FINISH");
      }
    })
  }

  deleteUser(body) {
    console.log("mainService - [deleteUser] - START");
    return new Promise((resolve, reject) => {
      try {
        var {
          email
        } = body;
        this.db
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
              this.db
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
            } else {
              resolve({
                code: 404,
                message: "Utente inesistente"
              })
            }
          })
          .catch(err => {
            console.log("mainService - [deleteUser - findUser] - ERROR -", err.message);
            resolve({
              code: 404,
              message: "Non e' stato trovato alcun utente"
            })
          })
      } catch (e) {
        console.log("mainService - [deleteUser] - ERROR -", e.message);
        reject(e)
      } finally {
        console.log("mainService - [deleteUser] - FINISH");
      }
    })
  }

  countUsers() {
    console.log("mainService - [countUsers] - START");
    return new Promise((resolve,reject) => {
      try {
        this.db
        .collection(COLLECTION_USER)
        .aggregate([
          {
            $lookup:
            {
              from: COLLECTION_CLICK,
              localField: "email",
              foreignField: 'email',
              as: "punti"
            }
          },
          {
            $project:
            {
              "_id": 0,
              "username": 1,
              "email": 1,
              "punti":
              {
                $cond:
                {
                  if:
                  {
                    $isArray: "$punti.urls"
                  },
                  then:
                  {
                    $size: "$punti.urls"
                  },
                  else: "0"
                }
              }
            }
          },
        ])
        .toArray()
        .then(result =>{
          if(result) {
            resolve({number:result.length, list: result})
          } else {
            resolve(null)
          }
        })
        .catch(err => {
          console.log("mainService - [countUsers] - ERROR -", err.message);
          reject(err);
        })
      } catch (e) {
        console.log("mainService - [countUsers] - ERROR -", e.message);
        reject(e);
      } finally {
        console.log("mainService - [countUsers] - FINISH");
      }
    })
  }
}


module.exports = MainService;
