import RouteError from '@/components/route-error';
import { generateCommonMetaTags } from '@/lib/utils';
import { getAllPostsOptions } from '@/query/posts.query';
import { dehydrateInfiniteQueryOnServer } from '@/query/util';
import { MetaFunction, useParams } from 'react-router';
import AllNews from './components/all-news';
import SingleNews from './components/single-news';

export async function loader() {
  return dehydrateInfiniteQueryOnServer(getAllPostsOptions());
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
