const appRoot = require('app-root-path');
const log = require(appRoot + '/configs/winston').getLogger();
var {
  MongoClient
} = require('mongodb');
var urlDB = process.env.MONGODB_URI ?
  process.env.MONGODB_URI :
  '<insert your mongoDB uri here>'

const DB_NAME = 'getYourPixels';

class Connector {
  constructor() {
    log.info("START")
    this.client = null;
    log.info("FINISH")
  }

  connect() {
    return new Promise((resolve, reject) => {
      try {
        log.info("START")
        MongoClient.connect(urlDB, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          poolSize: 400
        })
          .then(client => {
            this.client = client;
            let db = client.db(DB_NAME);
            resolve(db);
          })
          .catch(err => {
            throw err;
          })
      } catch (e) {
        log.error(e);
        reject(e);
      } finally {
        log.info("FINISH")
      }
    })
  };

  disconnect() {
    return new Promise((resolve, reject) => {
      try {
        log.info("START")
        if (this.client.isConnected()) {
          this.client.close().then(() => {
            resolve(true);
          })
            .catch(err => {
              throw err
            })
        }
        resolve(true);
      } catch (e) {
        log.error(e);
        reject(e);
      } finally {
        log.info("FINISH")
      }
    })
  }
}

module.exports = new Connector();
