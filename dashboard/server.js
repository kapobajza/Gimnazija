// Import Strapi's factory functions
const strapi = require("@strapi/strapi");
const path = require("path");

strapi
  .createStrapi({
    appDir: process.cwd(),
    distDir: path.resolve(__dirname, "dist"),
  })
  .start();
