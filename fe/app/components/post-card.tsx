import { getDateDay, getDateMonth } from '@/lib/date';
import { PostDTO } from '@/types/api/post.type';
import { Link } from '@remix-run/react';

type Props = {
  post: PostDTO;
};

const PostCard = ({ post }: Props) => {
  return (
    <article
      className="overflow-hidden rounded-lg bg-white dark:bg-slate-850 shadow-sm shadow-slate-500/20 dark:shadow-white/5"
      itemType="https://schema.org/Article"
    >
      <figure className="after: relative overflow-hidden">
        <Link to={`/obavijesti/${post.slug}`} className="group" prefetch="viewport">
          {post.image ? (
            <img
              src={post.image.url}
              alt={post.image.alt || `Obavijest ${post.title.rendered}`}
              className="transition-transform duration-1600 will-change-transform group-hover:scale-105 h-[330px] w-full object-cover"
            />
          ) : (
            <div className="h-[330px] bg-slate-300"></div>
          )}
          {post.modified ? (
            <div className="pointer-events-none absolute left-4 top-4 rounded bg-white px-4 py-3 text-center font-medium leading-none text-foreground shadow-md shadow-foreground/15">
              <span className="block text-md">{getDateDay(post.modified)}</span>
              <span className="text-[0.625rem] uppercase tracking-wider">{getDateMonth(post.modified)}</span>
            </div>
          ) : null}
        </Link>
      </figure>
      <div className="rounded-b-lg p-10">
        <h2 className="mb-4 text-xl font-bold">
          <Link
            className="hover:text-primary"
            to={`/obavijesti/${post.slug}`}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </h2>

        {post.excerpt?.rendered ? (
          <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} className="line-clamp-3"></div>
        ) : null}
      </div>
    </article>
  );
};

export default PostCard;
