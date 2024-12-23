import { apiInstance } from '@/networking/instance';
import { PostDTO } from '@/types/api/post.type';
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
      return apiInstance.postsApi.get(limit);
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
    queryFn({ pageParam }) {
      return apiInstance.postsApi.get(limit, pageParam ? (pageParam - 1) * limit : undefined);
    },
    initialPageParam: 1,
    getNextPageParam(lastPage: PostDTO[], allPages: PostDTO[][]) {
      if (lastPage.length < limit) {
        return undefined;
      }

      return allPages.length + 1;
    },
    staleTime: 3 * 60 * 1000,
  } satisfies FetchInfiniteQueryOptions<PostDTO[], Error, PostDTO[], QueryKey, number | undefined>;
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
      return apiInstance.postsApi.getBySlug(slug);
    },
  } satisfies FetchQueryOptions;
}
