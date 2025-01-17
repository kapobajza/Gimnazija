import { winston, formats } from "@strapi/logger";

export default {
  transports: [
    new winston.transports.Console({
      level: "http",
      format: winston.format.combine(
        formats.levelFilter("http"),
        formats.prettyPrint({ timestamps: "YYYY-MM-DD hh:mm:ss.SSS" }),
      ),
    }),
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      maxFiles: 10,
      maxsize: 10485760,
    }),
    new winston.transports.File({
      filename: "combined.log",
      maxFiles: 10,
      maxsize: 10485760,
    }),
  ],
};
