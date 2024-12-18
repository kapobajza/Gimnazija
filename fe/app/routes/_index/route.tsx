import Header from '@/components/layout/header';
import SectionHeroLayout from '@/components/sections/section-hero-layout';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'Početna' }, { name: 'description', content: 'Dobrodošli u Mješovitu srednju školu Bugojno!' }];
};

export default function Index() {
  return (
    <>
      <Header />
      <main className="relative mt-[112px] lg:mt-[161px]">
        <SectionHeroLayout />
        <div className="h-[1000px]"></div>
      </main>
    </>
  );
}
