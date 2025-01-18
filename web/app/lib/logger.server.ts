import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format((info) => {
      if (info instanceof Error) {
        return Object.assign({}, info, {
          stack: info.stack,
          message: info.message,
        });
      }

      return info;
    })(),
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, stack }) => {
      return `${timestamp} ${level}: ${message}${stack ? `\n${stack as string}` : ""}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/combined.log",
      maxFiles: 10,
      maxsize: 10485760,
    }),
  ],
});
