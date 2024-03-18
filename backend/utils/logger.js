const winston = require('winston');

const customFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}, ${info.detail}`)
);

const errorLogger = winston.createLogger({
    format: customFormat,
    transports: [
        new winston.transports.File({ filename: './logs/error.log', level: 'error' })
    ]
});

const warnLogger = winston.createLogger({
    format: customFormat,
    transports: [
        new winston.transports.File({ filename: './logs/warn.log', level: 'warn' })
    ]
});

const infoLogger = winston.createLogger({
    format: customFormat,
    transports: [
        new winston.transports.File({ filename: './logs/info.log', level: 'info' })
    ]
});

const debugLogger = winston.createLogger({
    format: customFormat,
    transports: [
        new winston.transports.File({ filename: './logs/debug.log', level: 'debug' })
    ]
});

module.exports = {
    errorLogger,
    warnLogger,
    infoLogger,
    debugLogger
};
