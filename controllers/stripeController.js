const appRoot = require('app-root-path');
var Payment = require(appRoot + '/services/paymentService');
var stripe = new Payment();
const log = require(appRoot + '/configs/winston').getLogger();

class Stripe {
  getProduct(req, res, next) {
    log.info("START")
    stripe.getProduct().then((result) => {
      log.info("END")
      res.status(200).send(result);
    }).catch(err => {
      log.error(err);
      next(err.message);
    })
  }
  async createSession(req, res, next) {
    try {
      log.info("START")
      const product = await stripe.getProduct();
      stripe.createOrder(product, { quantity: req.body.quantity, currency: req.body.currency }).then(result => {
        log.info("END")
        res.status(200).send({id: result.id})
      }).catch(err => {
        throw err;
      })
    } catch (e) {
      log.error(e);
      next(e.message);
    }
  }
}


module.exports = new Stripe();
