import FooterLayout from '@/components/layout/footer-layout';
import Header from '@/components/layout/header';
import SectionHeroLayout from '@/components/sections/section-hero-layout';
import SectionIconBoxes from '@/components/sections/section-icon-boxes';
import { prefetchHomePosts } from '@/query/posts.query';
import type { MetaFunction } from '@remix-run/node';
import SectionLatestNews from './components/section-latest-news';
import { generateCommonMetaTags } from '@/lib/utils';

export const meta: MetaFunction = () => {
  return generateCommonMetaTags({
    title: 'Početna',
    description: 'Dobrodošli u Mješovitu srednju školu Bugojno!',
  });
};

export async function loader() {
  return prefetchHomePosts();
}

export default function Index() {
  return (
    <>
      <Header />
      <main className="relative mt-header-spacing">
        <SectionHeroLayout />
        <SectionIconBoxes />
        <SectionLatestNews />
      </main>
      <FooterLayout />
    </>
  );
}
