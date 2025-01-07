import { api } from '@/networking/instance';
import { Post } from '@/types/api/post.types';
import {
  dehydrate,
  FetchInfiniteQueryOptions,
  FetchQueryOptions,
  QueryClient,
  QueryKey,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

export const postsQueryKey = {
  all: ['posts'],
  home: ['posts', 'home'],
  bySlug: (slug: string) => ['posts', { slug }],
} as const;

const HOME_POSTS_LIMIT = 3;

function getHomePostsOptions(limit: number) {
  return {
    queryKey: postsQueryKey.home,
    queryFn() {
      return api.postsApi.get(limit);
    },
  } satisfies FetchQueryOptions;
}

export async function prefetchHomePosts() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getHomePostsOptions(HOME_POSTS_LIMIT));
  return Response.json({ dehydratedState: dehydrate(queryClient) });
}

export function useGetHomePosts() {
  return useQuery(getHomePostsOptions(HOME_POSTS_LIMIT));
}

function getAllPostsOptions(limit: number) {
  return {
    queryKey: postsQueryKey.all,
    async queryFn({ pageParam }) {
      return api.postsApi.get(limit, pageParam);
    },
    initialPageParam: 0,
    getNextPageParam(lastPage: Post[], allPages: Post[][]) {
      if (lastPage.length < limit) {
        return undefined;
      }

      return allPages.length + 1;
    },
    staleTime: 3 * 60 * 1000,
  } satisfies FetchInfiniteQueryOptions<Post[], Error, Post[], QueryKey, number | undefined>;
}

export async function prefetchAllPosts(limit: number) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(getAllPostsOptions(limit));
  return Response.json({ dehydratedState: dehydrate(queryClient) });
}

export function useGetAllPosts(limit: number) {
  return useInfiniteQuery(getAllPostsOptions(limit));
}

export function getPostBySlugQueryOptions(slug: string) {
  return {
    queryKey: postsQueryKey.bySlug(slug),
    queryFn() {
      return api.postsApi.getBySlug(slug);
    },
  } satisfies FetchQueryOptions;
}
