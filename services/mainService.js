const appRoot = require('app-root-path');
const log = require(appRoot + '/configs/winston').getLogger();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Compressor = require(appRoot + '/utils/compressionUtil');
const ImageBuilder = require(appRoot + '/utils/imageUtil');
const COLLECTION_ADMIN = '_admin';
const COLLECTION_USER = '_user';
const COLLECTION_CLICK = '_click';
const COLLECTION_CLIENT = '_client';
const COLLECTION_GRID = '_grid';
const SALT_ROUNDS = 10;
const CANVAS_NAME = "CANVAS";
const DEFAULT_SQUARES = "DEFAULT_SQUARES";
const PROMO_CODE_PIXELS = "PIXELS";
const BONUS_POINTS = {
  referreal: 25,
  referred: 5
}
const LIMIT_REFERRED_USERS = 50;

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

  getDB() {
    return this.db;
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

  async generateHashedPassword(password) {
    try {
      return await new Promise((resolve,reject) => {
        bcrypt.hash(password, SALT_ROUNDS,
          function(err, hashedPassword) {
            if (err) {
              log.error(err);
              reject(err);
            } else {
              resolve({
                real: password,
                hash: hashedPassword
              });
            }
          })
      })
    } catch (error) {
      return Promise.reject(error);
    }
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
    log.info("START");
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
            Compressor.compressLZMA(file.base64)
              .then(value => {
                file.base64 = value;
                let data = {};
                if (company === '') {
                  if (positionRow === '' && positionCol === '') {
                    data = {
                      "email": email.trim(),
                      "url": url.trim(),
                      "file": file,
                      "row": row,
                      "col": col,
                      "date": new Date(),
                    }
                  } else if (positionRow === '' && positionCol !== '') {
                    data = {
                      "email": email.trim(),
                      "url": url.trim(),
                      "file": file,
                      "row": row,
                      "col": col,
                      "positionRow": 0,
                      "positionCol": (+positionCol) - 1,
                      "date": new Date(),
                    }
                  } else if (positionRow !== '' && positionCol === '') {
                    data = {
                      "email": email.trim(),
                      "url": url.trim(),
                      "file": file,
                      "row": row,
                      "col": col,
                      "positionRow": (+positionRow) - 1,
                      "positionCol": 0,
                      "date": new Date(),
                    }
                  } else {
                    data = {
                      "email": email.trim(),
                      "url": url.trim(),
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
                      "email": email.trim(),
                      "url": url.trim(),
                      "company": company.trim(),
                      "file": file,
                      "row": row,
                      "col": col,
                      "date": new Date(),
                    }
                  } else if (positionRow === '' && positionCol !== '') {
                    data = {
                      "email": email.trim(),
                      "url": url.trim(),
                      "company": company.trim(),
                      "file": file,
                      "row": row,
                      "col": col,
                      "positionRow": 0,
                      "positionCol": (+positionCol) - 1,
                      "date": new Date(),
                    }
                  } else if (positionRow !== '' && positionCol === '') {
                    data = {
                      "email": email.trim(),
                      "url": url.trim(),
                      "company": company.trim(),
                      "file": file,
                      "row": row,
                      "col": col,
                      "positionRow": (+positionRow) - 1,
                      "positionCol": 0,
                      "date": new Date(),
                    }
                  } else {
                    data = {
                      "email": email.trim(),
                      "url": url.trim(),
                      "company": company.trim(),
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
                          log.error(err);
                          reject(err);
                        })
                    }
                  })
                  .catch(err => {
                    log.error(err);
                    reject(err);
                  });
              })
          })
          .catch(err => {
            log.error(err);
            reject(err);
          })
      } catch (e) {
        log.error(e);
        reject(e)
      } finally {
        log.info("FINISH");
      }
    })
  }

  /**
   * Vecchia Gestione: calcolava la griglia e la tornava a frontend con un elemento per immagine
   */
  getClientsPixels(email, type) {
    log.info("START");
    return new Promise((resolve, reject) => {
      try {
        if(email && type === 'Client') {
          this.countPoints(email)
          .then(result => {
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
                promises.push(Compressor.decompressLZMA(items[i].file.base64)
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
                ImageBuilder.createPixels(values, result.list)
                .then(value => {
                  resolve(value);
                })
                .catch(err => {
                  log.error(err);
                  reject(err);
                })
              })
              .catch(err => {
                log.error(err);
                reject(err);
              })
            })
          })
        } else {
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
              promises.push(Compressor.decompressLZMA(items[i].file.base64)
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
              ImageBuilder.createPixels(values, null)
              .then(value => {
                resolve(value);
              })
              .catch(err => {
                log.error(err);
                reject(err);
              })
            })
            .catch(err => {
              log.error(err);
              reject(err);
            })
          })
        }
      } catch (e) {
        log.error(e);
        reject(e);
      } finally {
        log.info("FINISH");
      }
    })
  }

  /**
   * Nuova Gestione: Legge il canvas da DB e se non c'è lo crea (vuol dire che ancora non ci sono immagini)
   */
  getClientsPixels_V2(email, type) {
    log.info("START");
    return new Promise((resolve, reject) => {
      try {
        this.db
        .collection(COLLECTION_GRID)
        .findOne({
          "name": CANVAS_NAME
        }, {
          projection: {
            "_id": 0,
          }
        })
        .then(result => {
          if(result) {
            delete result.name;
            Compressor.decompressLZMA(result.canvas.dataURL)
            .then(val => {
              result.canvas.dataURL = val;
              if(email && type === 'Client') {
                this.countPoints(email)
                .then(res => {
                  this.db
                  .collection(COLLECTION_GRID)
                  .findOne({
                    "name": DEFAULT_SQUARES
                  }, {
                    projection: {
                      "_id": 0,
                    }
                  })
                  .then(squares => {
                    if(squares) {
                      ImageBuilder.createLabelVisitedUnvisited(res.list, squares, result)
                      .then(res => {
                        let logUser = type === 'Client' ? 'Client' : 'Admin';
                        res.type = logUser;
                        resolve(res);
                      })
                      .catch(e => {
                        log.error(e);
                        reject(e);
                      })
                    }
                  })
                })
              } else {
                if(email && type !== 'Client') {
                  result.type = 'Admin';
                }
                resolve(result);
              }
            })
          } else {
            this.createCanvas()
            .then(result => {
              this.db
              .collection(COLLECTION_GRID)
              .findOne({
                "name": CANVAS_NAME
              }, {
                projection: {
                  "_id": 0,
                }
              })
              .then(result => {
                if(result) {
                  delete result.name;
                  Compressor.decompressLZMA(result.canvas.dataURL)
                  .then(val => {
                    result.canvas.dataURL = val;
                    resolve(result)
                  })
                } else {
                  let err = new Error("Errore durante la lettura del canvas dopo la creazione");
                  reject(err);
                }
              })
              .catch(err => {
                log.error(err);
                reject(err);
              })
            })
            .catch(e => {
              log.error(e);
              reject(e);
            })
          }
        })
        .catch(err => {
          log.error(err);
          reject(err);
        })
      } catch (e) {
        log.error(e);
        reject(e);
      } finally {
        log.info("FINISH");
      }
    })
  }

  /**
   * Chiamato ad ogni salvattagio o modifica di un cliente: calcola un canvas da tutte le immagini e lo salva a db
   */
  createCanvas() {
    log.info("START");
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
            promises.push(Compressor.decompressLZMA(items[i].file.base64)
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
            this.db
            .collection(COLLECTION_GRID)
            .findOne({
              "name": DEFAULT_SQUARES
            }, {
              projection: {
                "_id": 0,
              }
            })
            .then(squares => {
              if(squares) {
                ImageBuilder.createCanvas(values, squares)
                .then(value => {
                  Compressor.compressLZMA(value.canvas.dataURL)
                  .then(result => {
                    value.canvas.dataURL = result;
                    let val = {
                      name: CANVAS_NAME,
                      ...value
                    }
                    let query = {name: CANVAS_NAME};
                    let update = { $set: val};
                    let options = {upsert: true};
                    this.db
                    .collection(COLLECTION_GRID)
                    .updateOne(query, update, options)
                    .then(result => {
                      const {
                        matchedCount,
                        modifiedCount,
                        upsertedCount
                      } = result;
                      if (upsertedCount || (matchedCount && modifiedCount)) {
                        resolve(true);
                      } else {
                        reject(new Error("Errore durante salvataggio canvas"))
                      }
                    })
                    .catch( e => {throw new Error(e)})
                  })
                })
                .catch(err => {
                  log.error(err);
                  reject(err);
                })
              }
            })
            .catch(e => {
              log.error(e);
              reject(e);
            })
          })
          .catch(err => {
            log.error(err);
            reject(err);
          })
        })
      } catch (e) {
        log.error(e);
        reject(e);
      } finally {
        log.info("FINISH");
      }
    })
  }

  getClient(body) {
    log.info("START");
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
              Compressor.decompressLZMA(result.file.base64)
              .then(val => {
                result.file.base64 = val;

                //Converto in stringa il mongoDB ObjectID che è usato come chiave unvioca
                result._id = JSON.stringify(result._id);
                //Modifico la numerazione di positionRow e positionCol per farli partire da 1
                result.positionRow = (+result.positionRow) + 1;
                result.positionCol = (+result.positionCol) + 1;
                resolve(result);
              })
              .catch(e => {
                log.error(e);
                reject(e);
              })
            } else {
              resolve(null)
            }
          })
          .catch(err => {
            log.error(err);
            reject(err);
          })
      } catch (e) {
        log.error(e);
        reject(e);
      } finally {
        log.info("FINISH");
      }
    })
  }

  getClientsFiltered(body) {
    log.info("START");
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
        log.error(e);
        reject(e);
      } finally {
        log.info("FINISH");
      }
    })
  }

  editClient(body) {
    log.info("START");
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
                Compressor.decompressLZMA(result.file.base64)
                .then(val => {
                  if (file.base64 !== val || row !== result.row || col !== result.col) {
                    ImageBuilder.resize(file, row, col)
                    .then(value => {
                      file = value;
                      Compressor.compressLZMA(file.base64)
                      .then(value => {
                        file.base64 = value;
                        let data = {};
                        let options = {
                          "upsert": false
                        };
                        if (company === '') {
                          if (positionRow === '' && positionCol === '' || (positionRow === null && positionCol === null)) {
                            data = {
                              "$set": {
                                "email": email.trim(),
                                "url": url.trim(),
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
                          } else if ((positionRow === '' || positionRow === null) && (positionCol !== '' || positionCol !== null)) {
                            data = {
                              "$set": {
                                "email": email.trim(),
                                "url": url.trim(),
                                "file": file,
                                "row": row,
                                "col": col,
                                "positionRow": 0,
                                "positionCol": (+positionCol) - 1,
                                "date": new Date(),
                              }
                            }
                          } else if ((positionRow !== '' || positionRow !== null) && (positionCol === '' || positionCol === null)) {
                            data = {
                              "$set": {
                                "email": email.trim(),
                                "url": url.trim(),
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
                                "email": email.trim(),
                                "url": url.trim(),
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
                          if ((positionRow === '' || positionRow === null) && (positionCol === '' || positionCol === null)) {
                            data = {
                              "$set": {
                                "email": email.trim(),
                                "url": url.trim(),
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
                          } else if ((positionRow === '' || positionRow === null) && (positionCol !== '' || positionCol !== null)) {
                            data = {
                              "$set": {
                                "email": email.trim(),
                                "url": url.trim(),
                                "company": company,
                                "file": file,
                                "row": row,
                                "col": col,
                                "positionRow": 0,
                                "positionCol": (+positionCol) - 1,
                                "date": new Date(),
                              }
                            }
                          } else if ((positionRow !== '' || positionRow !== null) && (positionCol === '' || positionCol === null)) {
                            data = {
                              "$set": {
                                "email": email.trim(),
                                "url": url.trim(),
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
                                "email": email.trim(),
                                "url": url.trim(),
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
                            reject(new Error("Non e' stato possibile modificare i dati del cliente"))
                          }
                        })
                        .catch(err => {
                          log.error(err);
                          reject(err);
                        })
                      })
                      .catch(err => {
                        log.error(err);
                        reject(err);
                      })
                    })
                    .catch(err => {
                      log.error(err);
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
                            "email": email.trim(),
                            "url": url.trim(),
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
                            "email": email.trim(),
                            "url": url.trim(),
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
                            "email": email.trim(),
                            "url": url.trim(),
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
                            "email": email.trim(),
                            "url": url.trim(),
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
                            "email": email.trim(),
                            "url": url.trim(),
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
                            "email": email.trim(),
                            "url": url.trim(),
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
                            "email": email.trim(),
                            "url": url.trim(),
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
                            "email": email.trim(),
                            "url": url.trim(),
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
                      log.error(err);
                      reject(err);
                    })
                  }
                })
                .catch(e => {
                  log.error(e);
                  reject(e);
                })
            } else {
              resolve(null);
            }
          })
          .catch(err => {
            log.error(err);
            reject(err);
          })
      } catch (e) {
        log.error(e);
        reject(e)
      } finally {
        log.info("FINISH");
      }
    })
  }

  deleteClient(body) {
    log.info("START");
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
                  log.error(err);
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
            log.error(err);
            resolve({
              code: 404,
              message: err.message
            })
          })
      } catch (e) {
        log.error(e);
        reject(e)
      } finally {
        log.info("FINISH");
      }
    })
  }

  getAdmin(email) {
    log.info("START");
    return new Promise((resolve, reject) => {
      try {
        this.db
          .collection(COLLECTION_ADMIN)
          .findOne({
            "email": email.trim(),
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
        log.error(e);
        reject(e)
      } finally {
        log.info("FINISH");
      }
    })
  }

  getAdmins(type) {
    log.info("START");
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
        log.error(e);
        reject(e)
      } finally {
        log.info("FINISH");
      }
    })
  }

  login(body) {
    log.info("START");
    return new Promise((resolve, reject) => {
      try {
        const {
          email,
          password
        } = body;
        this.db
          .collection(COLLECTION_ADMIN)
          .findOne({
            "email": email.trim(),
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
        log.error(e);
        reject(e)
      } finally {
        log.info("FINISH");
      }
    })
  }

  verifyPassword(body) {
    log.info("START");
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
        log.error(e);
        reject({
          code: 404,
          message: e.message
        })
      } finally {
        log.info("FINISH");
      }
    })
  }

  addAdmin(body) {
    log.info("START");
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
                    "email": email.trim(),
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
                    log.error(err);
                    reject(err);
                  })
              }
            })
          })
          .catch(err => {
            log.error(err);
            reject(err);
          })
      } catch (e) {
        log.info(e);
        reject(e)
      } finally {
        log.info("FINISH");
      }
    })
  }

  deleteAdmin(body) {
    log.info("START");
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
                  log.info(err);
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
        log.error(e);
        reject(e)
      } finally {
        log.info("FINISH");
      }
    })
  }

  countPixels() {
    log.info("START");
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
            log.error(err);
            reject(err);
          })
      } catch (e) {
        log.error(e);
        reject(e);
      } finally {
        log.info("FINISH");
      }
    })
  }

  resetPassword(body) {
    log.info("START");
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
        log.error(e);
        reject(e);
      } finally {
        log.info("FINISH");
      }
    })
  }

  changePassword(body) {
    log.info("START");
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
            log.error(err);
            reject(err);
          })
      } catch (e) {
        log.error(e);
        reject(e);
      } finally {
        log.info("FINISH");
      }
    })
  }

  changePasswordClient(body) {
    log.info("START");
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
            log.error(err);
            reject(err);
          })
      } catch (e) {
        log.error(e);
        reject(e);
      } finally {
        log.info("FINISH");
      }
    })
  }

  resetPasswordClient(body) {
    log.info("START");
    return new Promise((resolve, reject) => {
      try {
        const {
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
          }, {
            projection: {
              "_id": 0,
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
                message: "Utente inesistente"
              })
            }
          })
          .catch(err => {
            reject(err);
          })
      } catch (e) {
        log.error(e);
        reject(e);
      } finally {
        log.info("FINISH");
      }
    })
  }

  async getUser(email, username = null) {
    log.info("START");
    try {
      let query = {}
      query = {
        "$and": [{
          "$or": [{
            "email": email.trim()
          }, {
            "username": username ? username.trim() : email.trim(),
          }]
        }]
      }
      const result = await this.db.collection(COLLECTION_USER).findOne(query)
      if (result) {
        return Promise.resolve(result);
      } else {
        return Promise.resolve(null)
      }
    } catch (e) {
      log.error(e);
      return Promise.reject(e)
    } finally {
      log.info("FINISH");
    }
  }

  loginUser(body) {
    log.info("START");
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
                "email": email.trim()
              }, {
                "username": email.trim(),
              }]
            }, {
              "active": true,
            }]
          })
          .then(result => {
            if (result) {
              let db = this.getDB();
              bcrypt.compare(password, result.password, function(err, same) {
                if (err) {
                  reject(new Error("Password invalida"))
                } else {
                  if (same) {
                    if (!result.promoCode) {
                      let data = {
                        "$set": {
                          "promoCode": result.username.toUpperCase() + PROMO_CODE_PIXELS
                        }}
                      let options = {
                        "upsert": false,
                      };
                      db
                        .collection(COLLECTION_USER)
                        .updateOne({
                          "_id": result['_id']
                        }, data, options)
                        .then(value => {
                          const {
                            matchedCount,
                            modifiedCount
                          } = value;
                          if (matchedCount && modifiedCount) {
                            log.info("PromoCode aggiunto all'utente " + result.username)
                          } else {
                            log.info("PromoCode non aggiunto all'utente " + result.username)
                          }
                        })
                        .catch(err => {
                          log.error(err);
                          reject(err);
                        })
                    }
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
        log.error(e);
        reject(e)
      } finally {
        log.info("FINISH");
      }
    })
  }

  saveUser(body) {
    log.info("START");
    return new Promise((resolve, reject) => {
      try {
        let {
          username,
          email,
          password,
          promoCode:referreal=null,
        } = body;
        
        let user = '';
        this.generateHashedPassword(password)
          .then(result => {
            password = result.hash;
            this.getUser(email, username).then(value => {
              if (value) {
                if (value.username !== username && value.email === email) {
                  reject(new Error("Email già esistente"));
                } else if (value.username === username && value.email !== email) {
                  reject(new Error("Username già esistente"))
                } else if (value.username === username && value.email === email) {
                  reject(new Error("Utente già esistente"))
                } else {
                  reject(new Error("Impossibile salvare l'utente"))
                }
              } else {
                this.checkIfReferrealExistAndUpdate(referreal)
                .then(val => {
                  crypto.randomBytes(20, (err, buf) => {
                    user = {
                      "_id": new this.ObjectID(),
                      "username": username.trim(),
                      "email": email.trim(),
                      "password": password,
                      "type": 'Client',
                      "active": false,
                      "activeExpires": Date.now() + (3600 * 1000),
                      "promoCode": username.trim().toUpperCase() + PROMO_CODE_PIXELS,
                    }
                    if(val) {
                      user["referreal"] = referreal
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
                        username: user.username,
                      })
                    })
                    .catch(err => {
                      log.error(err);
                      reject(err);
                    })
                  })
                })
                .catch(e => {
                  reject(new Error("Non esiste nessun referreal con questo codice"))
                })
              }
            })
          })
          .catch(err => {
            log.error(err);
            reject(err);
          })
      } catch (e) {
        log.error(e);
        reject(e)
      } finally {
        log.info("FINISH");
      }
    })
  }

  async editUser(body, emailSession) {
    log.info("START");
    try {
        let {
          username,
          email,
          password,
        } = body;
        
        let id = '';
        let emailSess = '';
        let set = {
          email: false,
          password: false,
          username: false,
        }
        const user = await this.getUser(emailSession);
        
        if (user) {
          id = user._id;
          emailSess = user.email;
        }

        if(password) {
          const result = await this.generateHashedPassword(password);
          password = result.hash;
          set.password = true;
        }
        if(email) {
          const result = await this.getUser(email);
          if(result) {
            return Promise.reject(new Error('Email già esistente'))
          } else {
            set.email = true;
          }
        }
        if(username) {
          const result = await this.getUser(username, username);
          if(result) {
            return Promise.reject(new Error('Username già esistente'))
          } else {
            set.username = true;
          }
        }
        let data = {
          "$set": {}
        };
        let options = {
          "upsert": false,
        };
        let change = {};
        if (set.passoword) {
          data["$set"].password = password;
        }
        if(set.username) {
          data["$set"].username = username;
          change.username = true;
        }
        if(set.email) {
          data["$set"].email = email;
          change.email = true;
        }
        const res = await this.db.collection(COLLECTION_USER)
          .updateOne({
              "_id": id
            },
            data, 
            options)
        if (res.matchedCount && res.modifiedCount) {
          if(change.email || change.username) {
            delete data["$set"].password;
            let query = {}
            query = {
              "email": emailSess
            }
            const {matchedCount,modifiedCount} = await this.db.collection(COLLECTION_CLICK)
              .updateOne(query, data, options)
            if (matchedCount && modifiedCount) {
              return Promise.resolve("I dati sono stati aggiornati correttamente. Sarai rimandato alla login")
            } else {
              log.error("Non e' stato trovato un utente nella tabella _click con questi dati: " + emailSess);
              return Promise.resolve("I dati sono stati aggiornati correttamente. Sarai rimandato alla login")
            }
          } else {
            return Promise.resolve("I dati sono stati aggiornati correttamente. Sarai rimandato alla login")
          }
        } else {
          return Promise.reject(new Error("Impossibile aggiornare i dati dell'utente"))
        }
      } catch (e) {
        log.error(e);
        return Promise.reject(e)
      } finally {
        log.info("FINISH");
      }
  }

  activeUser(activeToken) {
    log.info("START");
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
                .then(value1 => {
                  const {
                    matchedCount,
                    modifiedCount
                  } = value1;
                  if (matchedCount && modifiedCount) {
                    resolve({email:value.email,username:value.username})
                  } else {
                    resolve(false);
                  }
                })
                .catch(err => {
                  log.error(err);
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
            log.error(err);
            reject(err);
          })
      } catch (e) {
        log.error(e);
        reject(e)
      } finally {
        log.info("FINISH");
      }
    })
  }

  saveClick(emailClient, urlClicked) {
    log.info("START");
    return new Promise((resolve, reject) => {
      try {
        if(!emailClient) {
          resolve({code:401,message:"Click non salvato poiche' non è un utente loggato"});
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
                            "urls": urls,
                            "points": result1.points + 1
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
                          log.error(err);
                          reject(err);
                        })
                      }
                      resolve('Click già presente')
                    } else {
                      let urls = [];
                      urls.push(urlClicked);
                      this.checkIsReferredAndGetBonusPoint(result?.referreal)
                        .then(bonusPoint => {
                          this.db
                          .collection(COLLECTION_CLICK)
                          .insertOne({
                            "email": result.email,
                            "username": result.username,
                            "urls": urls,
                            "points": 1 + bonusPoint,
                          })
                          .then(value => {
                            resolve("Click salvato")
                          })
                          .catch(err => {
                            log.error(err);
                            reject(err);
                          })
                      })
                      .catch(err=> {
                        log.error(err);
                        reject(err);
                      })
                    }
                  })
                  .catch(err => {
                    reject(new Error("Impossibile salvare il click"))
                  })
                } else {
                  log.error(new Error("Utente non trovato"));
                  reject({message:"Utente non trovato"});
                }
              })
              .catch(err => {
                log.error(err);
                reject(err);
              })
            }
          })
          .catch(err => {
            reject(new Error("Impossibile verificare l'utente loggato"))
          })
      } catch (e) {
        log.error(e);
        reject(e)
      } finally {
        log.info("FINISH");
      }
    })
  }

  deleteUser(body) {
    log.info("START");
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
                  log.info(err);
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
            log.error(err);
            resolve({
              code: 404,
              message: "Non e' stato trovato alcun utente"
            })
          })
      } catch (e) {
        log.error(e);
        reject(e)
      } finally {
        log.info("FINISH");
      }
    })
  }

  countUsers() {
    log.info("START");
    return new Promise((resolve,reject) => {
      try {
        this.db
        .collection(COLLECTION_USER)
        .aggregate([
          {
            $lookup:
            {
              from: COLLECTION_CLICK,
              let : { user_email: "$email"},
              pipeline: [
                { 
                  $match: { 
                    $expr: { 
                      $and: [ 
                        { 
                          $eq: [
                            "$$user_email",
                            "$email" 
                          ]
                        }
                      ]
                    }
                  }
                },
                {
                  $project: {
                    "_id": 0,
                    "punti": {
                      $cond: {
                          if: {
                              $isArray: "$urls"
                          },
                          then: {
                            //$exists not work in aggreg, so use $ifNull that works without $cond
                            $ifNull:['$points', {$size:"$urls"}], //if $points != null => $points else $size:"$urls"
                          }, 
                          else : "0"
                      }
                    }
                  }
                }
              ],
              // localField: "email",
              // foreignField: 'email',
              as: "aggreg"
            }
          },
          {
            $project:
            {
              "_id": 0,
              "username": 1,
              "email": 1,
              "punti": "$aggreg.punti"
            }
          },
        ])
        .toArray()
        .then(result =>{
          if(result) {
            for(let i in result) {
              result[i].punti = result[i].punti[0] ? result[i].punti[0] : 0;
            }
            resolve({number:result.length, list: result})
          } else {
            resolve(null)
          }
        })
        .catch(err => {
          log.error(err);
          reject(err);
        })
      } catch (e) {
        log.error(e);
        reject(e);
      } finally {
        log.info("FINISH");
      }
    })
  }

  countPoints(email) {
    log.info("START");
    return new Promise((resolve,reject) => {
      try {
        this.db
        .collection(COLLECTION_CLICK)
        .findOne({
          "$and": [{
            "$or": [{
              "email": email
            }, {
              "username": email,
            }]
          }]
        }, {
          projection: {
            "_id": 0,
          }
        })
        .then(result => {
          if(result) {
            if(result.points) {
              resolve({list:result.urls, points: result.points})
            } else {
            resolve({list:result.urls, points: 0})
            }
          } else {
            resolve({list:[], points: 0})
          }
        })
        .catch(err => {
          reject(err);
        })
      } catch (e) {
        log.error(e);
        reject(e);
      } finally {
        log.info("FINISH");
      }
    })
  }

  async removeExpiredUsers() {
    log.info("START");
    try {
      const result = await this.db
      .collection(COLLECTION_USER)
        .deleteMany({
          "$and": [{
            active: false,
          },{
            activeExpires: { "$exists": true, "$lt": Date.now()}
          }]
        })
      log.info("Deleted " + result.deletedCount + " users")
      log.info("FINISH")
    } catch (error) {
      log.error(error)
    }
  }

  async checkIfReferrealExistAndUpdate(ref) {
    log.info("START");
    try {
      if(!ref) {
        return Promise.resolve(false);
      }
      const result = await this.db
      .collection(COLLECTION_USER)
      .findOne({
        "promoCode": ref
      })
      if (result && (!result.referredUsers || (result.referredUsers && result.referredUsers < LIMIT_REFERRED_USERS))) {
        const result1 = await this.updateCounterUsersReferred(result);
        if(result1) {
          return Promise.resolve(true);
        } else {
          return Promise.reject(false);
        }
      } else {
        return Promise.reject(false);
      }
    } catch (error) {
      log.error(error);
      return Promise.reject(error);
    } finally {
      log.info("FINISH")
    }
  }

  async checkIsReferredAndGetBonusPoint(ref) {
    log.info("START");
    try {
      if(!ref) {
        return Promise.resolve(0);
      } else {
        const result = await this.db
        .collection(COLLECTION_USER)
        .aggregate([
          {
            $match: {
              "promoCode": ref
            }
          },
          {
            $lookup: {
              from: COLLECTION_CLICK,
              localField: "email",
              foreignField: "email",
              as: "result"
            }
          },
          {
            $project: {
              "_id": 0,
              "email": 1,
              "username": 1,
              "elem": {
                $cond: {
                  if: {
                    $eq: ["$result",[]]
                  },
                  then: null,
                  else: {
                    $arrayElemAt: ["$result", 0]
                  }
                }
              }
            }
          }
        ]).next();
        if (result && result.elem) {
          const {modifiedCount} = await this.db
          .collection(COLLECTION_CLICK)
          .updateOne({
            "_id": result.elem._id,
          }, {
            "$set": {
              "points": (result.elem.points ? result.elem.points : result.elem.urls.length) + BONUS_POINTS.referreal
            }
          }, {
            "upsert": false
          })
          if(modifiedCount) {
            return Promise.resolve(BONUS_POINTS.referred)
          } else {
            return Promise.reject(new Error("Non sono stati aggiunti i punti extra al referreal"))
          }
        } else {
          const result1 = await this.db
          .collection(COLLECTION_CLICK)
          .insertOne({
            "email": result.email,
            "username": result.username,
            "urls": [],
            "points": BONUS_POINTS.referreal,
          })
          if(result1) {
            return Promise.resolve(BONUS_POINTS.referred)
          } else {
            return Promise.reject(new Error("Non sono stati aggiunti i punti extra al referreal"))
          }
        }
      }
    } catch (error) {
      log.error(error);
      return Promise.reject(error);
    } finally {
      log.info("FINISH");
    }
  }

  async updateCounterUsersReferred(result) {
    log.info("START");
    try {
      const {modifiedCount} = await this.db
      .collection(COLLECTION_USER)
      .updateOne(
        {
        "_id" : result["_id"]
        },
        {
          $set: {
            "referredUsers": result.referredUsers ? result.referredUsers + 1 : 1,
          }
        },
        {
          "upsert": false
        }
      )
      if(modifiedCount) {
        return Promise.resolve(true);
      } else {
        return Promise.reject(new Error("Non e' stato possibile aggiornare il numero degli utenti invitati per l'utente " + result.username))
      }
    } catch(error) {
      log.error(error);
      return Promise.reject(error);
    } finally {
      log.info("FINISH");
    }
  }

  async getAllUsers() {
    log.info("START");
    try {
      const result = await this.db.collection(COLLECTION_USER).find().toArray();
      if (result) {
        let accounts = [];
        for(let i in result) {
          const obj = {};
          obj.username = result[i].username;
          obj.email = result[i].email;
          accounts.push(obj);
        }
        return accounts;
      } else {
        throw new Error("Non e' stato possibile recuperare gli utenti");
      }
    } catch (e) {
      log.error(e);
      throw e;
    } finally {
      log.info("FINISH");
    }
  }
}


module.exports = MainService;
