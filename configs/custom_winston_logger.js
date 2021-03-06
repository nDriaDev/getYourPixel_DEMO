const winston = require('winston');
const { format } = winston;
const { combine, colorize, timestamp, printf } = format;


//NON USATA ! Riporta solo come classe d'esempio

/**
 * /**
 * Use CallSite to extract filename and number, for more info read: https://v8.dev/docs/stack-trace-api#customizing-stack-traces
 * @param numberOfLinesToFetch - optional, when we want more than one line back from the stacktrace
 * @returns {string|null} filename and line number separated by a colon, if numberOfLinesToFetch > 1 we'll return a string
 * that represents multiple CallSites (representing the latest calls in the stacktrace)
 *
 */
const getFileNameAndLineNumber = function getFileNameAndLineNumber (numberOfLinesToFetch = 1) {
    const oldStackTrace = Error.prepareStackTrace;
    const boilerplateLines = line => line &&
        line.getFileName() &&
        // in the following line you may want to "play" with adding a '/' as a prefix/postfix to your module name
        (line.getFileName().indexOf('custom_winston_logger.js')) &&
        (line.getFileName().indexOf('/node_modules/') < 0);

    try {
        // eslint-disable-next-line handle-callback-err
        Error.prepareStackTrace = (err, structuredStackTrace) => structuredStackTrace;
        Error.captureStackTrace(this);
        // we need to "peel" the first CallSites (frames) in order to get to the caller we're looking for
        // in our case we're removing frames that come from logger module or from winston
        const callSites = this.stack.filter(boilerplateLines);
        if (callSites.length === 0) {
            // bail gracefully: even though we shouldn't get here, we don't want to crash for a log print!
            return null;
        }
        const results = [];
        for (let i = 0; i < numberOfLinesToFetch; i++) {
            const callSite = callSites[i];
            let fileName = callSite.getFileName();
            results.push(fileName + ':' + callSite.getLineNumber());
        }
        return results.join('\n');
    } finally {
        Error.prepareStackTrace = oldStackTrace;
    }
};

const humanReadableFormatter = printf(({ level, message, ...metadata }) => {
    const filename = getFileNameAndLineNumber();
    return `[${level}] [${filename}] ${message} ${JSON.stringify(metadata)}`;
})

module.exports = new winston.createLogger({
  transports: [
      new winston.transports.Console({
            level: 'info',
            handleExceptions: true,
            humanReadableUnhandledException: true,
            json: false,
            colorize: { all: true },
            stderrLevels: ['error', 'alert', 'critical', 'bizAlert'],
            format: combine(
                colorize(),
                timestamp(),
                humanReadableFormatter,
            ),
        })
    ]
});
