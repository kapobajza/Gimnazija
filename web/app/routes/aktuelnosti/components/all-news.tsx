import Container from '@/components/layout/container';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import PostCard from '@/components/post-card';
import SectionPageTitle from '@/components/sections/section-page-title';
import { Button } from '@/components/ui/button';
import { useGetAllPosts } from '@/query/posts.query';

export default function AllNews() {
  const { isLoading, isFetchingNextPage, fetchNextPage, data, hasNextPage, isError } = useGetAllPosts();

  return (
    <>
      <Header />
      <main className="relative">
        <SectionPageTitle>Najnovije vijesti i informacije iz škole</SectionPageTitle>
        <section className="border-b py-24">
          <div className="container">
            <Container
              isLoading={isLoading || isFetchingNextPage}
              isError={isError}
              isEmpty={data?.pages[0]?.length === 0}
              emptyMessage="Trenutno nema aktuelnosti"
              className="grid grid-cols-1 gap-10 lg:grid-cols-3"
            >
              {data?.pages.map((page) => {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                return page?.map((post) => {
                  return <PostCard post={post} key={post.documentId} />;
                });
              })}
            </Container>

            {hasNextPage ? (
              <div className="mx-auto mt-10 text-center">
                <Button
                  size="lg"
                  disabled={isLoading || isFetchingNextPage}
                  onClick={() => {
                    void fetchNextPage();
                  }}
                >
                  Učitaj još
                </Button>
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
