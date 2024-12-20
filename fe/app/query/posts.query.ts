import { apiInstance } from '@/networking/instance';
import { dehydrate, FetchQueryOptions, QueryClient, useQuery } from '@tanstack/react-query';

export const postsQueryKey = {
  all: (limit: number) => ['posts', limit],
} as const;

const HOME_POSTS_LIMIT = 3;

function getPostsOptions(limit: number) {
  return {
    queryKey: postsQueryKey.all(limit),
    queryFn: function getPosts() {
      return apiInstance.postsApi.get(limit);
    },
  } satisfies FetchQueryOptions;
}

export async function prefetchHomePosts() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getPostsOptions(HOME_POSTS_LIMIT));
  return Response.json({ dehydratedState: dehydrate(queryClient) });
}

export function useGetHomePosts() {
  return useQuery(getPostsOptions(HOME_POSTS_LIMIT));
}
