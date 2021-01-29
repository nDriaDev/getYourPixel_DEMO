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
    '/getClientsPixels',
    controllers.database.getClientsPixels
  )
  .post(
    '/saveClient',
    auth,
    controllers.database.saveClient
  )
  .post(
    '/getClientsFiltered',
    auth,
    controllers.database.getClientsFiltered
  )
  .post(
    '/getClient',
    controllers.database.getClient
  )
  .post(
    '/editClient',
    controllers.database.editClient
  )
  .post(
    '/deleteClient',
    auth,
    controllers.database.deleteClient
  )
  .post(
    '/addAdmin',
    auth,
    controllers.database.addAdmin
  )
  .post(
    '/deleteAdmin',
    auth,
    controllers.database.deleteAdmin
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
    '/getAdmin',
    auth,
    controllers.database.getAdmin
  )
  .post(
    '/getAdmins',
    auth,
    controllers.database.getAdmins
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
    '/loginUser',
    controllers.database.loginUser
  )
  .post(
    '/getUser',
    auth,
    controllers.database.getUser
  )
  .post(
    '/saveUser',
    controllers.database.saveUser,
    controllers.mailer.sendActivationEmail
  )
  .post(
    '/deleteUser',
    controllers.database.deleteUser
  )
  .get(
    '/activeUser/:activeToken',
    controllers.database.activeUser
  )
  .post(
    '/saveClick',
    controllers.database.saveClick
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
