import logLevels from '../test/logLevels.js';

const developmentConfig = {
  logLevel: logLevels.DEBUG,
  logToConsole: true,
  logToFile: false
};

const productionConfig = {
  logLevel: logLevels.WARNING,
  logToConsole: false,
  logToFile: true,
  filePath: '' // especifica la ruta y el nombre del archivo
};

export default process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;
