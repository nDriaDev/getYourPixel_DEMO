var {
  MongoClient
} = require('mongodb');
var urlDB = process.env.MONGODB_URI ?
  process.env.MONGODB_URI :
  '<insert your mongoDB uri here>'

const DB_NAME = 'getYourPixels';

class Connector{
  constructor() {
    console.log("ConnectionDB - [constructor] - START");
    this.client = null;
    console.log("ConnectionDB - [constructor] - FINISH");
  }

  connect() {
    return new Promise((resolve,reject) => {
      try {
        console.log("ConnectionDB - [connect] - START");
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
        console.log("ConnectionDB - [connect] - ERROR", e);
        reject(e);
      } finally{
        console.log("ConnectionDB - [connect] - FINISH");
      }
    })
  };

  disconnect() {
    try {
      return new Promise((resolve,reject) => {
        if(this.client.isConnected()) {
          this.client.close().then(() => {
            console.log("database - [getAdmin] - FINISH");
            resolve(true);
          })
          .catch(err => {
            reject(err)
          })
        }
        resolve(true);
      })
    } catch (e) {
      console.log("ConnectionDB - [disconnect] - ERROR", e);
    } finally {
      console.log("ConnectionDB - [disconnect] - FINISH");
    }
  }
}

module.exports = new Connector();
