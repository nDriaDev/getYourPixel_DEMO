const router = require('express').Router();
const controllers = require('../controllers');
const appRoot = require('app-root-path');
const log = require(appRoot + '/configs/winston').getLogger();

try {
  log.info("START")
  router.get(
    '*',
    controllers.initController
  )

  log.info("FINISH")

} catch (e) {
  log.error(e);
  throw e;
}



module.exports = router;
