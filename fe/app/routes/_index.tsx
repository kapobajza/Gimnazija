import Header from '@/components/layout/header';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'Početna' }, { name: 'description', content: 'Dobrodošli u Mješovitu srednju školu Bugojno!' }];
};

export default function Index() {
  return (
    <>
      <Header />
      <main className="relative mt-[4.5rem] lg:mt-[161px]"></main>
    </>
  );
}
