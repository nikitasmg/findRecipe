export type Logger = {
  log: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
};

export class LoggerService {
  logger: Logger;
  constructor(logger: Logger = console) {
    this.logger = logger;
  }

  log(message: unknown) {
    this.logger.log(JSON.stringify(message));
  }

  warn(message: unknown) {
    this.logger.log(JSON.stringify(message));
  }

  error(message: unknown) {
    this.logger.log(JSON.stringify(message));
  }
}
