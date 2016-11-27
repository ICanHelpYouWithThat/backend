import winston from 'winston';
import expressWinston from 'express-winston';


// Log all requests to the API, plus errors that occur within them.
//
const consoleOptions = {
    "json": false,
    "colorize": true
};


const requestLoggerTransports = [
    new (winston.transports.Console)(consoleOptions)
];

const requestLoggerOptions = {
    "transports": requestLoggerTransports,
    "expressFormat": true,
    "meta": false
};

const requestLogger = expressWinston.logger(requestLoggerOptions);

// Log additional errors.
//
const errorLogger = expressWinston.errorLogger({
    "transports": [
        new winston.transports.Console({
            "json": false,
            "colorize": true
        })
    ]
});


// Export logging functionality.
//
export default {

    // The log method, for logging messages.
    //
    "log": winston.log,

    // Loggers.
    //
    "requestLogger": requestLogger,
    "errorLogger": errorLogger,

    // Log levels, in descending order of severity.
    //
    "error": winston.error,      // The API crashed or encountered some other kind of severe error.
    "warn": winston.warn,        // The API encountered an error that's not its fault.  Might be out of memory, database error, etc.
    "info": winston.info,        // The API is being used incorrectly, such as receiving bad data from the user.
    "verbose": winston.verbose,  // The API is doing something it should: uploading an image, firing an event, etc.
    "debug": winston.debug,      // Trace problematic code step by step.  Commit debug lines only in systematically problematic areas.
    "silly": winston.silly       // Use for debugging lines that will NOT be committed.
};
