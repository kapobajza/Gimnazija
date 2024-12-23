import { MainNavEnum, siteConfig } from '@/config/site';
import { generateCommonMetaTags } from '@/lib/utils';
import { getPostBySlugQueryOptions } from '@/query/posts.query';
import { PostDTO } from '@/types/api/post.type';
import { LoaderFunctionArgs, MetaFunction, TypedResponse } from '@remix-run/node';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import invariant from 'tiny-invariant';

export async function loader({ params }: LoaderFunctionArgs): Promise<TypedResponse<{ post: PostDTO | undefined }>> {
  invariant(params.slug, 'Expected a slug param');

  const queryClient = new QueryClient();
  const options = getPostBySlugQueryOptions(params.slug);
  await queryClient.prefetchQuery(options);
  const post = queryClient.getQueryData<PostDTO | undefined>(options.queryKey);
  return Response.json({ dehydratedState: dehydrate(queryClient), post });
}

export default function SingleNewsPage() {
  return null;
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const post = data?.post;

  if (post) {
    return generateCommonMetaTags({
      title: post.title.stripped,
      description: post.excerpt?.stripped,
      image: post.image?.url,
      url: `${siteConfig.url}${MainNavEnum.Obavijesti.href}/${post.slug}`,
    });
  }

  return generateCommonMetaTags({
    title: 'Obavijest',
    description: 'Obavijesti MSŠ Gimnazije Bugojno',
  });
};
