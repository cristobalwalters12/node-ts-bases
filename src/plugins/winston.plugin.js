const winston = require('winston'); 
const { combine,timestamp,json } = winston.format;

const logger = winston.createLogger({
    level: 'info',
    
    format: combine( timestamp(), json() ), // Formato de los logsssss
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

logger.add(new winston.transports.Console({
    format: winston.format.simple(),
}));

// Configuración básica del patrón de diseño Factory
// con winston para la creación de logs
module.exports.buildLogger = function(service) {
    return {
        error: (message) => {
            logger.error({ service, message });
        },
        info: (message) => {
            logger.info({ service, message });
        },
        log: (level, message) => {
            logger.log({ level, service, message });
        }
    }
}