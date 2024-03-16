const winston = require('winston');

// Создаем форматтер для добавления временной метки к сообщениям
const customFormat = winston.format.combine(
    winston.format.timestamp(), // Добавляем временную метку
    winston.format.json(), // Форматируем сообщения в JSON
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}, ${info.detail}`)
);

// Создаем логгер для каждого уровня логирования
const loggers = {
    error: winston.createLogger({
        format: customFormat,
        transports: [
            new winston.transports.File({ filename: './logs/error.log', level: 'error' })
        ]
    }),
    warn: winston.createLogger({
        format: customFormat,
        transports: [
            new winston.transports.File({ filename: './logs/warn.log', level: 'warn' })
        ]
    }),
    info: winston.createLogger({
        format: customFormat,
        transports: [
            new winston.transports.File({ filename: './logs/info.log', level: 'info' })
        ]
    }),
    debug: winston.createLogger({
        format: customFormat,
        transports: [
            new winston.transports.File({ filename: './logs/debug.log', level: 'debug' })
        ]
    }),
};

module.exports = loggers;

