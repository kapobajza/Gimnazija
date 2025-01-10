import type { StrapiApp } from "@strapi/strapi/admin";
import Logo from "./extensions/logo.png";
import Favicon from "./extensions/favicon.png";

export default {
  config: {
    locales: ["bs-BA"],
    translations: {
      "bs-BA": {
        "Auth.form.email.label": "test",
        Users: "Korisnici",
        City: "CITY (FRENCH)",
        Id: "ID french",
        "global.home": "Početna",
      },
    },
    auth: {
      logo: Logo,
    },
    menu: {
      logo: Logo,
    },
    head: {
      favicon: Favicon,
    },
    tutorials: false,
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
