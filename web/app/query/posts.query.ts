import type {
  FetchInfiniteQueryOptions,
  FetchQueryOptions,
  QueryKey,
} from "@tanstack/react-query";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { api } from "@/networking/instance";
import type { Post } from "@/types/api/post.types";

export const postsQueryKey = {
  all: ["posts"],
  home: ["posts", "home"],
  bySlug: (slug: string) => ["posts", { slug }],
} as const;

const HOME_POSTS_LIMIT = 3;

export function getHomePostsOptions() {
  return {
    queryKey: postsQueryKey.home,
    queryFn() {
      return api.postsApi.get(HOME_POSTS_LIMIT);
    },
  } satisfies FetchQueryOptions;
}

export function useGetHomePosts() {
  return useQuery(getHomePostsOptions());
}

const ALL_POSTS_LIMIT = 6;

export function getAllPostsOptions() {
  return {
    queryKey: postsQueryKey.all,
    async queryFn({ pageParam }) {
      return api.postsApi.get(ALL_POSTS_LIMIT, pageParam);
    },
    initialPageParam: 0,
    getNextPageParam(lastPage: Post[], allPages: Post[][]) {
      if (lastPage.length < ALL_POSTS_LIMIT) {
        return undefined;
      }

      return allPages.length + 1;
    },
    staleTime: 3 * 60 * 1000,
  } satisfies FetchInfiniteQueryOptions<
    Post[],
    Error,
    Post[],
    QueryKey,
    number | undefined
  >;
}

export function useGetAllPosts() {
  return useInfiniteQuery(getAllPostsOptions());
}

export function getPostBySlugQueryOptions(slug: string) {
  return {
    queryKey: postsQueryKey.bySlug(slug),
    queryFn() {
      return api.postsApi.getBySlug(slug);
    },
  } satisfies FetchQueryOptions;
}
