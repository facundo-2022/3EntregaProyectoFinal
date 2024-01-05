// logger.js

import winston from 'winston';
import logConfig from '../test/logconfig.js';
import logLevels from '../test/loglevels.js';

// Configuración de winston para el logger de desarrollo
const developmentLogger = winston.createLogger({
  level: logConfig.logLevel,
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console()
  ]
});

// Configuración de winston para el logger de producción
const productionLogger = winston.createLogger({
  level: logConfig.logLevel,
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: 'errors.log', level: 'error' })
  ]
});

function logMessage(message, logLevel) {
  if (!(logLevel in logLevels)) {
    console.error(`Invalid log level: ${logLevel}`);
    return;
  }

  const logString = `${logLevel.toUpperCase()}: ${message}`;

  if (logLevels[logLevel] < logLevels[logConfig.logLevel]) {
    // El mensaje no alcanza el nivel de log configurado, no lo registramos
    return;
  }

  if (logConfig.logToConsole) {
    developmentLogger.log(logLevel, logString);
  }

  if (logConfig.logToFile) {
    productionLogger.log(logLevel, logString);
  }
}

export default logMessage;
