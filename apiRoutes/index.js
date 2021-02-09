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
    controllers.mainController.getClientsPixels
  )
  .post(
    '/saveClient',
    auth,
    controllers.mainController.saveClient
  )
  .post(
    '/getClientsFiltered',
    auth,
    controllers.mainController.getClientsFiltered
  )
  .post(
    '/getClient',
    auth,
    controllers.mainController.getClient
  )
  .post(
    '/editClient',
    auth,
    controllers.mainController.editClient
  )
  .post(
    '/deleteClient',
    auth,
    controllers.mainController.deleteClient
  )
  .post(
    '/addAdmin',
    auth,
    controllers.mainController.addAdmin
  )
  .post(
    '/deleteAdmin',
    auth,
    controllers.mainController.deleteAdmin
  )
  .get(
    '/login',
    controllers.init
  )
  .post(
    '/login',
    controllers.mainController.login
  )
  .post(
    '/resetPassword',
    controllers.mainController.resetPassword
  )
  .post(
    '/changePassword',
    auth,
    controllers.mainController.changePassword
  )
  .post(
    '/getAdmin',
    auth,
    controllers.mainController.getAdmin
  )
  .post(
    '/getAdmins',
    auth,
    controllers.mainController.getAdmins
  )
  .get(
    '/countPixels',
    auth,
    controllers.mainController.countPixels
  )
  .post(
    '/verifyPassword',
    auth,
    controllers.mainController.verifyPassword
  )
  .post(
    '/loginUser',
    controllers.mainController.loginUser
  )
  .post(
    '/getUser',
    auth,
    controllers.mainController.getUser
  )
  .post(
    '/saveUser',
    controllers.mainController.saveUser,
    controllers.mailer.sendActivationEmail
  )
  .post(
    '/deleteUser',
    auth,
    controllers.mainController.deleteUser
  )
  .get(
    '/activeUser/:activeToken',
    controllers.mainController.activeUser
  )
  .post(
    '/saveClick',
    controllers.mainController.saveClick
  )
  .get(
    '/countUsers',
    auth,
    controllers.mainController.countUsers
  )
  .get(
    '/countPoints',
    auth,
    controllers.mainController.countPoints
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
