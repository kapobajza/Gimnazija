import type { MainNavItem } from "@/types/nav";

export const siteConfig = {
  name: "Mješovita srednja škola Bugojno",
  description:
    "Mješovita srednja škola Bugojno je jedna od najstarih obrazovnih ustanova na području SBK koja je osnovana 17.11.1945. i od tada je uveliko utjecala na privredni i kulturni razvoj grada Bugojna",
  url: "https://gimnazija-bug.ba",
};

export const MainNavEnum = {
  Pocetna: {
    title: "Početna",
    href: "/",
  },
  OName: {
    title: "O nama",
    href: "/o-nama",
  },
  Uposlenici: {
    title: "Uposlenici",
    href: "/uposlenici",
  },
  Aktuelnosti: {
    title: "Aktuelnosti",
    href: "/aktuelnosti",
  },
} as const satisfies Record<string, MainNavItem>;

export const mainNav = Object.values(MainNavEnum);
