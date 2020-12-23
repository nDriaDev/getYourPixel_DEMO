var Payment = require('../payment');
var stripe = new Payment();

class Stripe {
  getProduct(req, res, next) {
    stripe.getProduct().then((result) => {
      res.status(200).send(result);
    }).catch(err => {
      next(err.message);
    })
  }
  async createSession(req, res, next) {
    try {
      const product = await stripe.getProduct();
      stripe.createOrder(product, req.body.quantity).then(result => {
        res.status(200).send({id: result.id})
      }).catch(err => {
        throw err;
      })
    } catch (e) {
      next(e.message);
    }
  }
}


module.exports = new Stripe();
