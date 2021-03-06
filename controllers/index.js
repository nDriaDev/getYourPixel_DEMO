const initController = require('./initController');
const mailerController = require('./emailController');
const mainController = require('./mainController');
const stripeController = require('./stripeController');
const logoutController = require('./logoutController');
const authMiddlewareController = require('./authMiddlewareController');





module.exports =
{
    initController,
    mailerController,
    stripeController,
    mainController,
    logoutController,
    authMiddlewareController,
}
