import FooterLayout from '@/components/layout/footer-layout';
import Header from '@/components/layout/header';
import SectionHeroLayout from '@/components/sections/section-hero-layout';
import SectionIconBoxes from '@/components/sections/section-icon-boxes';
import { prefetchHomePosts } from '@/query/posts.query';
import type { MetaFunction } from '@remix-run/node';
import SectionLatestNews from './components/section-latest-news';

export const meta: MetaFunction = () => {
  return [{ title: 'Početna' }, { name: 'description', content: 'Dobrodošli u Mješovitu srednju školu Bugojno!' }];
};

export async function loader() {
  return prefetchHomePosts();
}

export default function Index() {
  return (
    <>
      <Header />
      <main className="relative mt-[88px] lg:mt-[112px]">
        <SectionHeroLayout />
        <SectionIconBoxes />
        <SectionLatestNews />
      </main>
      <FooterLayout />
    </>
  );
}
