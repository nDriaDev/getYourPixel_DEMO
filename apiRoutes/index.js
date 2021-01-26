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
    '/getPixels',
    controllers.database.getPixels
  )
  .post(
    '/savePixel',
    auth,
    controllers.database.savePixel
  )
  .post(
    '/getPixelsFiltered',
    auth,
    controllers.database.getPixelsFiltered
  )
  .post(
    '/getFullPixel',
    controllers.database.getFullPixel
  )
  .post(
    '/editPixel',
    controllers.database.editPixel
  )
  .post(
    '/removePixel',
    auth,
    controllers.database.removePixel
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
    '/getUser',
    auth,
    controllers.database.getUser
  )
  .post(
    '/getUsers',
    auth,
    controllers.database.getUsers
  )
  .get(
    '/countPixels',
    auth,
    controllers.database.countPixels
  )
  .post(
    '/verifyPassword',
    auth,
    controllers.database.verifyPassword
  )
  .post(
    '/loginClient',
    controllers.database.loginClient
  )
  .post(
    '/getClient',
    auth,
    controllers.database.getClient
  )
  .post(
    '/registryClient',
    controllers.database.registryClient,
    controllers.mailer.sendActivationEmail
  )
  .get(
    '/activeClient/:activeToken',
    controllers.database.activeClient
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
