import SectionTitle from '@/components/sections/section-title';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetHomePosts } from '@/query/posts.query';
import { motion } from 'framer-motion';
import PostCard from './post-card';

const SectionLatestNews = () => {
  const { data = [], isLoading } = useGetHomePosts();

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
            Posljednje obavijesti
          </SectionTitle>
          <div className={'grid grid-cols-1 gap-10 lg:grid-cols-3'}>
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-[33rem] w-full" />)
              : data.map((post) => {
                  return <PostCard post={post} key={post.id} />;
                })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionLatestNews;
