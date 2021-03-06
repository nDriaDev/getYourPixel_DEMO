const appRoot = require('app-root-path');
const log = require(appRoot + '/configs/winston').getLogger();
const stripe = require('stripe')(
  process.env.PRV_KEY_STRIPE ? process.env.PRV_KEY_STRIPE :
  '<your private key here>'
);
const PRODUCT_DESCRIPTION = "Inizia subito ad utilizzare la nostra piattaforma.\nAnche tu potrai finalmente raggiungere milioni di persone!\nScegli la dimensione del tuo spazio e inserisci i dati, dopo aver premuto il pulsante qua sotto. \nRiceverai un'email di conferma dell'ordine dove ti chiederemo di specificare i dati necessari per concludere l'operazione:\nimmagine, link della tua pagina ecc. \n \nNon ti preoccupare ora,\nper ogni dubbio saremo a tua disposizione!"


class Payment {
  getProduct(){
    return new Promise((resolve,reject) => {
      if(process.env.PRV_KEY_STRIPE === undefined) {
        resolve({
          "id": "prod_IRcHGOTIGBPerO",
          "object": "product",
          "active": true,
          "attributes": [],
          "created": 1606153285,
          "description": PRODUCT_DESCRIPTION,
          "images": [
            "https://files.stripe.com/links/fl_live_EP6nh6tjHj5ky4NGDA0NpyGS"
          ],
          "livemode": true,
          "metadata": {},
          "name": "Pixel 5x5",
          "statement_descriptor": null,
          "type": "service",
          "unit_label": null,
          "updated": 1606153285,
          "price": {
            "id": "price_1Hqj2XKkWUWoTHxXi3fpLhlW",
            "object": "price",
            "active": true,
            "billing_scheme": "per_unit",
            "created": 1606153285,
            "currency": "eur",
            "livemode": true,
            "lookup_key": null,
            "metadata": {},
            "nickname": null,
            "product": "prod_IRcHGOTIGBPerO",
            "recurring": null,
            "tiers_mode": null,
            "transform_quantity": null,
            "type": "one_time",
            "unit_amount": 2500,
            "unit_amount_decimal": "2500"
          }
        })
      }
      try {
        log.info("START")
        let prod = {};
        stripe.products.list(
        ).then((result) => {
          prod = result.data[0];
          prod.description = prod.description == null ? PRODUCT_DESCRIPTION : prod.description;
          stripe.prices.list().then((result2) =>{
            for(let i in result2.data){
              if(result2.data[i].product === prod.id){
                prod.price = result2.data[i]
              }
            }
            log.info("FINISH");
            resolve(prod);
          }).catch(err => {
            log.error(err);
            reject(err);
          })
        }).catch(err => {
          log.error(err);
          reject(err);
        })
      } catch (e) {
        log.error(e);
        reject(e);
      }
    })
  }
  createOrder(product, quantity){
    return new Promise((resolve,reject)=>{
      log.info("START")
      stripe.checkout.sessions.create({
        payment_method_types: ['card','sepa_debit'],
        line_items: [
          {
            price_data: {
              currency: product.price.currency,
              product_data: {
                name: product.name,
                images: product.images,
              },
              unit_amount: product.price.unit_amount,
            },
            quantity: quantity ? quantity : 1,
          },
        ],
        mode: 'payment',
        success_url: (process.env.BUY_URL ? process.env.BUY_URL : '<your url page to redirect here>' ) + '?success=true',
        cancel_url: (process.env.BUY_URL ? process.env.BUY_URL : '<your url page to redirect here>' ) + '?canceled=true',
      }).then(result => {
        log.info("FINISH")
        resolve(result);
      }).catch(err => {
        log.error(err);
        reject(err);
      })
    })
  }

}

module.exports = Payment;
