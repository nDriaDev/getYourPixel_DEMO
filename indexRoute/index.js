const router = require('express').Router();
const controllers = require('../controllers');

try {
  console.log("router - [loadIndexRoute] - START")
  router.get(
    '*',
    controllers.init
  )

  console.log("router - [loadIndexRoute] - FINISH")

} catch (e) {
  console.log("router - [loadIndexRoute] - ERROR -", e.message);
  throw e;
}



module.exports = router;
