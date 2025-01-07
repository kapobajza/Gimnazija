import { MainNavItem } from '@/types/nav';

export const siteConfig = {
  name: 'Mješovita srednja škola Bugojno',
  description:
    'Mješovita srednja škola Bugojno je jedna od najstarih obrazovnih ustanova na području SBK koja je osnovana 17.11.1945. i od tada je uveliko utjecala na privredni i kulturni razvoj grada Bugojna',
  keywords: ['Mješovita srednja škola Bugojno', 'Mješovita srednja škola', 'Bugojno', 'Gimnazija', 'Gimnazija Bugojno'],
  url: 'https://mjesovita-srednja-skola.bug.com',
};

export const MainNavEnum = {
  Pocetna: {
    title: 'Početna',
    href: '/',
  },
  OName: {
    title: 'O nama',
    href: '/o-nama',
  },
  Uposlenici: {
    title: 'Uposlenici',
    href: '/uposlenici',
  },
  Obavijesti: {
    title: 'Obavijesti',
    href: '/obavijesti',
  },
} as const satisfies Record<string, MainNavItem>;

export const mainNav = Object.values(MainNavEnum);
