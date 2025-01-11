import { getDateDay, getDateMonth } from '@/lib/date';
import { PostDTO } from '@/types/api/post.types';
import { Link } from 'react-router';

type Props = {
  post: PostDTO;
};

const PostCard = ({ post }: Props) => {
  return (
    <article
      className="dark:shadow-white/8 overflow-hidden rounded-lg bg-white shadow-sm shadow-slate-500/20 dark:bg-slate-850"
      itemType="https://schema.org/Article"
    >
      <figure className="after: relative overflow-hidden">
        <Link to={`/aktuelnosti/${post.slug}`} className="group" prefetch="viewport">
          {post.cover ? (
            <img
              src={post.cover.formats.medium.url}
              alt={post.cover.alternativeText || `Obavijest ${post.title}`}
              className="h-[330px] w-full object-cover transition-transform duration-1600 will-change-transform group-hover:scale-105"
            />
          ) : (
            <div className="h-[330px] bg-slate-300"></div>
          )}
          {post.updatedAt ? (
            <div className="pointer-events-none absolute left-4 top-4 rounded bg-white px-4 py-3 text-center font-medium leading-none text-foreground shadow-md shadow-foreground/15">
              <span className="block text-md">{getDateDay(post.updatedAt)}</span>
              <span className="text-[0.625rem] uppercase tracking-wider">{getDateMonth(post.updatedAt)}</span>
            </div>
          ) : null}
        </Link>
      </figure>
      <div className="rounded-b-lg p-10">
        <h2 className="mb-4 text-xl font-bold">
          <Link className="hover:text-primary-50 dark:hover:text-primary" to={`/aktuelnosti/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        {post.excerpt ? <p className="line-clamp-3 break-words text-md leading-relaxed">{post.excerpt}</p> : null}
      </div>
    </article>
  );
};

export default PostCard;
