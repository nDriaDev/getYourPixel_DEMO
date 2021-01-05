const router = require('express').Router();
const auth = require('../authMiddleware');
const controllers = require('../controllers');

try {
  console.log("router - [loadApiRoutes] - START")
  router.get(
    '/',
    controllers.init
  )
  .get(
    '/checkToken',
    auth,
    (req, res, next) => {
      res.status(200).send({code:200,message:'Authorized'});
    }
  )
  .post(
    '/email',
    controllers.mailer.sendMail
  )
  .get(
    '/sendMailResetPassword',
    controllers.mailer.sendMailResetPassword
  )
  .post(
    '/products',
    controllers.stripe.getProduct
  )
  .post(
    '/create-session',
    controllers.stripe.createSession
  )
  .get(
    '/pixels',
    controllers.database.getPixels
  )
  .post(
    '/addUser',
    auth,
    controllers.database.addUser
  )
  .post(
    '/deleteUser',
    auth,
    controllers.database.deleteUser
  )
  .get(
    '/login',
    controllers.init
  )
  .post(
    '/login',
    controllers.database.login
  )
  .post(
    '/resetPassword',
    controllers.database.resetPassword
  )
  .post(
    '/changePassword',
    auth,
    controllers.database.changePassword
  )
  .post(
    '/verifyPassword',
    auth,
    controllers.database.verifyPassword
  )
  .get(
    '/logout',
    auth,
    controllers.logout
  )

  console.log("router - [loadApiRoutes] - FINISH")

} catch (e) {
  console.log("router - [loadApiRoutes] - ERROR -", e.message);
  throw e;
}



module.exports = router;
