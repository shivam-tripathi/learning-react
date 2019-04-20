import appRoot from 'app-root-path';
import * as winston from 'winston';

const options = {
  levels: {
    trace: 0,
    input: 1,
    verbose: 2,
    prompt: 3,
    debug: 4,
    info: 5,
    data: 6,
    help: 7,
    warn: 8,
    error: 9,
  },
  file: {
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    timestamp: true,
  },
  console: {
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
      winston.format.printf(
        msg =>
          `${winston.format.colorize().colorize(msg.level, `${msg.level}: `)}[${msg.timestamp}] ${
            msg.message
          }`
      )
    ),
    json: false,
    silent: false,
  },
};

// winston.addColors(options.colors);
const logger = winston.createLogger({
  levels: options.levels,
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  // format: winston.format.combine(winston.format.colorize({ all: true }), winston.format.simple()),
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream().on('data', msg => logger.info(msg));

export default logger;
