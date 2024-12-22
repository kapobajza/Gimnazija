import FooterLayout from '@/components/layout/footer-layout';
import Header from '@/components/layout/header';
import PostCard from '@/components/post-card';
import SectionPageTitle from '@/components/sections/section-page-title';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { generateCommonMetaTags } from '@/lib/utils';
import { prefetchAllPosts, useGetAllPosts } from '@/query/posts.query';
import { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return generateCommonMetaTags({
    title: 'Obavijesti',
    description: 'Obavijesti MSŠ Gimnazije Bugojno',
  });
};

const LIMIT = 6;

export async function loader() {
  return prefetchAllPosts(LIMIT);
}

export default function NewsPage() {
  const { isLoading, isFetchingNextPage, fetchNextPage, data, hasNextPage } = useGetAllPosts(LIMIT);

  return (
    <>
      <Header />
      <main className="relative">
        <SectionPageTitle>Najnovije vijesti i informacije iz škole</SectionPageTitle>
        <section className="border-b py-24">
          <div className="container">
            <div className={'grid grid-cols-1 gap-10 lg:grid-cols-3'}>
              {data?.pages.map((page) => {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                return page?.map((post) => {
                  return <PostCard post={post} key={post.id} />;
                });
              })}

              {isLoading || isFetchingNextPage
                ? Array.from({ length: LIMIT }).map((_, i) => <Skeleton key={i} className="h-[33rem] w-full" />)
                : null}
            </div>

            {hasNextPage ? (
              <div className="mt-10 text-center mx-auto">
                <Button
                  size={'lg'}
                  disabled={isLoading || isFetchingNextPage}
                  onClick={() => {
                    void fetchNextPage();
                  }}
                >
                  Učitaj više
                </Button>
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <FooterLayout />
    </>
  );
}
