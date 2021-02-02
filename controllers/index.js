const init = require('./init');
const mailer = require('./email');
const mainController = require('./mainController');
const stripe = require('./stripe');
const logout = require('./logout');





module.exports =
{
    init,
    mailer,
    stripe,
    mainController,
    logout,
}
