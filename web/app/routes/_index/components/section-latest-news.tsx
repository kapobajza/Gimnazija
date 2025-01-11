import Container from '@/components/layout/container';
import PostCard from '@/components/post-card';
import SectionTitle from '@/components/sections/section-title';
import { useGetHomePosts } from '@/query/posts.query';
import { motion } from 'framer-motion';

const SectionLatestNews = () => {
  const { data = [], isLoading, isError } = useGetHomePosts();

  return (
    <section className="bg-muted py-16 dark:bg-slate-900 lg:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.5,
          }}
        >
          <SectionTitle
            subtitle="Najnovije vijesti i informacije iz škole"
            sectionClasses="mx-auto max-w-xl text-center mb-12"
            titleClasses="mb-3 text-center"
            subtitleClasses="text-md font-medium"
          >
            Posljednje aktuelnosti
          </SectionTitle>
          <Container
            isLoading={isLoading}
            isError={isError}
            isEmpty={data.length === 0}
            emptyMessage="Trenutno nema aktuelnosti"
            className="grid grid-cols-1 gap-10 lg:grid-cols-3"
          >
            {data.map((post) => {
              return <PostCard post={post} key={post.documentId} />;
            })}
          </Container>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionLatestNews;
