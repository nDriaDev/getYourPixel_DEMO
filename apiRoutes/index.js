const appRoot = require('app-root-path');
const log = require(appRoot + '/configs/winston').getLogger();
const controllers = require(appRoot + '/controllers');
const router = require('express').Router();

try {
  log.info("START")
  router.get(
    '/',
    controllers.initController
  )
  .get(
    '/checkToken',
    controllers.authMiddlewareController,
    (req, res, next) => {
      res.status(200).send({code:200,message:'Authorized', type:req.session.type});
    }
  )
  .post(
    '/email',
    controllers.mailerController.sendMail
  )
  .get(
    '/sendMailResetPassword',
    controllers.mailerController.sendMailResetPassword
  )
  .post(
    '/products',
    controllers.stripeController.getProduct
  )
  .post(
    '/create-session',
    controllers.stripeController.createSession
  )
  .get(
    '/getClientsPixels',
    controllers.mainController.getClientsPixels
  )
  .post(
    '/saveClient',
    controllers.authMiddlewareController,
    controllers.mainController.saveClient
  )
  .post(
    '/getClientsFiltered',
    controllers.authMiddlewareController,
    controllers.mainController.getClientsFiltered
  )
  .post(
    '/getClient',
    controllers.authMiddlewareController,
    controllers.mainController.getClient
  )
  .post(
    '/editClient',
    controllers.authMiddlewareController,
    controllers.mainController.editClient
  )
  .post(
    '/deleteClient',
    controllers.authMiddlewareController,
    controllers.mainController.deleteClient
  )
  .post(
    '/addAdmin',
    controllers.authMiddlewareController,
    controllers.mainController.addAdmin
  )
  .post(
    '/deleteAdmin',
    controllers.authMiddlewareController,
    controllers.mainController.deleteAdmin
  )
  .get(
    '/login',
    controllers.initController
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
    controllers.authMiddlewareController,
    controllers.mainController.changePassword
  )
  .post(
    '/getAdmin',
    controllers.authMiddlewareController,
    controllers.mainController.getAdmin
  )
  .post(
    '/getAdmins',
    controllers.authMiddlewareController,
    controllers.mainController.getAdmins
  )
  .get(
    '/countPixels',
    controllers.authMiddlewareController,
    controllers.mainController.countPixels
  )
  .post(
    '/verifyPassword',
    controllers.authMiddlewareController,
    controllers.mainController.verifyPassword
  )
  .post(
    '/loginUser',
    controllers.mainController.loginUser
  )
  .post(
    '/getUser',
    controllers.authMiddlewareController,
    controllers.mainController.getUser
  )
  .post(
    '/saveUser',
    controllers.mainController.saveUser,
    controllers.mailerController.sendActivationEmail
  )
  .post(
    '/deleteUser',
    controllers.authMiddlewareController,
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
    controllers.authMiddlewareController,
    controllers.mainController.countUsers
  )
  .get(
    '/countPoints',
    controllers.authMiddlewareController,
    controllers.mainController.countPoints
  )
  .get(
    '/logout',
    controllers.authMiddlewareController,
    controllers.logoutController
  )

  log.info("FINISH")

} catch (e) {
  log.error(e);
  throw e;
}



module.exports = router;
