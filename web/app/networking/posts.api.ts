import { createApi } from '@/networking/api';
import { Post, PostDTO } from '@/types/api/post.types';
import { ApiResponse } from '@/types/api/response.types';
import { AppErrorCode } from './error';
import { getEnvKey } from '@/env/get';
import { generateImageWithBaseUrl } from '@/lib/image';
import { generateFieldsQueryParams } from '@/lib/utils';

export const createPostsApi = () => {
  const postsApi = createApi({
    routePrefix: 'posts',
  });

  const getFormattedPost = (post: Post): PostDTO => {
    const apiUrl = getEnvKey('PUBLIC_GMNZ_API_URL');

    const excerpt = post.content
      .filter((block) => block.type !== 'image')
      .map((block) =>
        block.children.map((child: unknown) => (child as { text: string | undefined }).text?.trim()).join(''),
      )
      .join(' ');

    return {
      ...post,
      cover: post.cover ? generateImageWithBaseUrl(apiUrl, post.cover) : undefined,
      excerpt,
    };
  };

  const commontPostFieldsQueryParams = {
    ...generateFieldsQueryParams<Post>(['content', 'documentId', 'slug', 'title', 'updatedAt']),
    'populate[categories][fields][0]': 'title',
    'populate[cover][fields][0]': 'formats',
  };

  return {
    async get(limit = 10, offset = 0): Promise<PostDTO[]> {
      const {
        data: { data },
      } = await postsApi.get<ApiResponse<Post[]>>('', {
        queryParams: {
          'pagination[limit]': limit,
          'pagination[start]': offset,
          ...commontPostFieldsQueryParams,
        },
      });

      return data.map(getFormattedPost);
    },
    async getBySlug(slug: string): Promise<PostDTO> {
      const {
        data: { data },
      } = await postsApi.get<ApiResponse<Post[]>>('', {
        queryParams: {
          'filters[slug][$eq]': slug,
          ...commontPostFieldsQueryParams,
          'populate[cover][fields][1]': 'url',
        },
      });

      if (!data[0]) {
        throw {
          code: AppErrorCode.POST_NOT_FOUND,
        };
      }

      return getFormattedPost(data[0]);
    },
  };
};

export type PostsApi = ReturnType<typeof createPostsApi>;
