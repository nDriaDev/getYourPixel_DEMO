const appRoot = require('app-root-path');
const log = require(appRoot + '/configs/winston').getLogger();
const path = require("path");

module.exports = (req, res) => {
  try {
    log.info("START")
    if (req.url.indexOf("/external/") === 0 || req.url.indexOf("/css/") === 0 || req.url.indexOf("/media/") === 0
    || req.url.indexOf("/js/") === 0 || req.url.indexOf(".js") === 0 || req.url.indexOf(".css") === 0
    || req.url.indexOf(".map") === 0) {
      res.setHeader("Cache-Control", "public, max-age=2592000");
      res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    }

    res.sendFile(path.join(__dirname, '/../build', 'index.html'));
  } catch(e) {
    log.error(e);
  } finally {
    log.info("FINISH")
  }
};
