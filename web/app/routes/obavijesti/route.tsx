import RouteError from '@/components/route-error';
import { generateCommonMetaTags } from '@/lib/utils';
import { prefetchAllPosts } from '@/query/posts.query';
import { MetaFunction, useParams } from '@remix-run/react';
import AllNews from './components/all-news';
import SingleNews from './components/single-news';
import { ALL_ROUTES_DATA_LIMIT } from './constants';

export async function loader() {
  return prefetchAllPosts(ALL_ROUTES_DATA_LIMIT);
}

export const meta: MetaFunction = () => {
  return generateCommonMetaTags({
    title: 'Obavijesti',
    description: 'Obavijesti MSŠ Gimnazije Bugojno',
  });
};

export default function NewsPage() {
  const { slug } = useParams();

  if (!slug || slug.trim() === '') {
    return <AllNews />;
  }

  return <SingleNews slug={slug} />;
}

export function ErrorBoundary() {
  return <RouteError />;
}
