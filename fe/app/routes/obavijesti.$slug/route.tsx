import { MainNavEnum, siteConfig } from '@/config/site';
import { generateCommonMetaTags, QUERY_CLIENT } from '@/lib/utils';
import { getPostBySlugQueryOptions } from '@/query/posts.query';
import { PostDTO } from '@/types/api/post.type';
import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import invariant from 'tiny-invariant';

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.slug, 'Expected a slug param');

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getPostBySlugQueryOptions(params.slug));
  return Response.json({ dehydratedState: dehydrate(queryClient) });
}

export default function SingleNewsPage() {
  return null;
}

export const meta: MetaFunction = ({ params }) => {
  const { queryKey } = getPostBySlugQueryOptions(params.slug ?? '');
  const post = QUERY_CLIENT.getQueryData<PostDTO | undefined>(queryKey);

  if (post) {
    return generateCommonMetaTags({
      title: post.title.stripped,
      description: post.excerpt?.stripped,
      image: post.image?.url,
      url: `${siteConfig.url}/${MainNavEnum.Obavijesti.href}/${post.slug}`,
    });
  }

  return generateCommonMetaTags({
    title: 'Obavijest',
    description: 'Obavijesti MSŠ Gimnazije Bugojno',
  });
};
