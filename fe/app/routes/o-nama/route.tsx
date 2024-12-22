import Header from '@/components/layout/header';
import FooterLayout from '@/components/layout/footer-layout';
import SectionPageTitle from '@/components/sections/section-page-title';
import SectionChecklist from './components/section-checklist';
import SectionHistory from './components/section-history';
import { MetaFunction } from '@remix-run/react';
import { generateCommonMetaTags } from '@/lib/utils';

export const meta: MetaFunction = () => {
  return generateCommonMetaTags({
    title: 'O nama',
    description: 'Kratki osvrt na MSŠ Gimnaziju Bugojno',
  });
};

export default function About() {
  return (
    <>
      <Header />
      <main className="relative">
        <SectionPageTitle subtitle="Više od pola stoljeća tradicije i obrazovanja. Mjesto gdje prošlost susreće budućnost, gdje se oblikuju generacije lidera i gdje znanje postaje temelj za životne uspjehe. Naša škola nije samo obrazovna institucija, već i inspiracija za učenike da postanu najbolja verzija sebe i ostave trag u svijetu.">
          O nama
        </SectionPageTitle>
        <SectionChecklist />
        <SectionHistory />
      </main>
      <FooterLayout />
    </>
  );
}
