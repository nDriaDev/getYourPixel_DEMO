const appRoot = require('app-root-path');
const winston = require('winston');
const StackElements = require('./stackElements');
const path = require('path');

class Logger {
  _myFormat = winston.format.printf(({level, message, timestamp}) => {
    let levels = ["info","error"];
    for(let i in levels) {
      if(level.indexOf(levels[i]) >= 0) {
        let indLevel = level.indexOf(levels[i]);
        let newLevel = level.substr(0,indLevel) + levels[i].toUpperCase() + level.substr(indLevel+levels[i].length,level.length);
        level = newLevel;
      }
    }
    return `${timestamp} ${level} - ${message}`;
  })

  _formatDate () {
    let dt = new Date().toISOString().split('T')[0];
    dt = dt.split('-');
    return dt[2] + '-' + dt[1] + '-' + dt[0];
  }

  _options = {
    file: {
      level: 'info',
      filename: `${appRoot}/logs/Log_${this._formatDate()}.log`,
      humanReadableUnhandledException: true,
      handleExceptions: true,
      json: false,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize : false,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'DD-MM-YYYY HH:mm:ss'
        }),
        this._myFormat,
      ),
    },
    console: {
      level: 'debug',
      humanReadableUnhandledException: true,
      handleExceptions: true,
      json: false,
      colorize : true,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'DD-MM-YYYY HH:mm:ss'
        }),
        winston.format.colorize(),
        this._myFormat,
      ),
    }
  }

  constructor() {

    this.winstonLogger = new winston.createLogger({
      transports: [new winston.transports.Console(this._options.console)],
      exitOnError: false,
    })


    // create a stream object with a 'write' function that will be used by `morgan`
    this.winstonLogger.stream = {
      write: function(message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        this.winstonLogger.info(message);
      }
    }
    this.logger = {
      error: (text) => {
        this.winstonLogger.error(text);
      },
      info: (text) => {
        this.winstonLogger.info(text);
      }
    }
  }

  setLogProduction() {
    this.winstonLogger
    .clear()
    .add(new winston.transports.File(this._options.file))
  }

  //si aspetta __filename
  getLogger() {
    let log = {...this.logger};
    log.error = (e, text = '') => {
      // let infoText = this._getFileName(file,text)
      if (text === '') {
        if (e.message === undefined) {
          text = e;
        } else {
          text = e.message
        }
      }
      let infoText = StackElements.getFormatedStackTraceElement(text, e); // 0 for current level, 1 for parent , ..., 3 for function name in class
      this.winstonLogger.error(infoText)
    }
    log.info = (text) => {
      // let infoText = this._getFileName(file,text)
      let infoText = StackElements.getFormatedStackTraceElement(text); // 0 for current level, 1 for parent , ..., 3 for function name in class
      this.winstonLogger.info(infoText)
    }
    return log;
  }


}

module.exports = new Logger();
