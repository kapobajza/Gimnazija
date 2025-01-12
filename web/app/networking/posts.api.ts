import { createApi } from "@/networking/api";
import type { Post, PostDTO } from "@/types/api/post.types";
import type { ApiResponse } from "@/types/api/response.types";
import { getEnvKey } from "@/env/get";
import { generateImageWithBaseUrl } from "@/lib/image";
import { generateFieldsQueryParams } from "@/lib/utils";

import { AppError, AppErrorCode } from "./error";

export const createPostsApi = () => {
  const postsApi = createApi({
    routePrefix: "posts",
  });

  const getFormattedPost = (post: Post): PostDTO => {
    const apiUrl = getEnvKey("PUBLIC_GMNZ_API_URL");

    const excerpt = post.content
      .filter((block) => block.type !== "image")
      .map((block) =>
        block.children
          .map((child: unknown) =>
            (child as { text: string | undefined }).text?.trim(),
          )
          .join(""),
      )
      .join(" ");

    return {
      ...post,
      cover: post.cover
        ? generateImageWithBaseUrl(apiUrl, post.cover)
        : undefined,
      excerpt,
      images: post.images
        ? post.images.map((image) => generateImageWithBaseUrl(apiUrl, image))
        : undefined,
    };
  };

  const commontPostFieldsQueryParams = {
    ...generateFieldsQueryParams<Post>([
      "content",
      "documentId",
      "slug",
      "title",
      "updatedAt",
    ]),
    "populate[categories][fields][0]": "title",
    "populate[cover][fields][0]": "formats",
  };

  return {
    async get(limit = 10, offset = 0): Promise<PostDTO[]> {
      const {
        data: { data },
      } = await postsApi.get<ApiResponse<Post[]>>("", {
        queryParams: {
          "pagination[limit]": limit,
          "pagination[start]": offset,
          ...commontPostFieldsQueryParams,
        },
      });

      return data.map(getFormattedPost);
    },
    async getBySlug(slug: string): Promise<PostDTO> {
      const {
        data: { data },
      } = await postsApi.get<ApiResponse<Post[]>>("", {
        queryParams: {
          "filters[slug][$eq]": slug,
          "pagination[limit]": 1,
          ...commontPostFieldsQueryParams,
          "populate[cover][fields][1]": "url",
          "populate[images][fields][0]": "url",
          "populate[images][fields][1]": "formats",
        },
      });

      if (!data[0]) {
        throw new AppError({ code: AppErrorCode.POST_NOT_FOUND });
      }

      return getFormattedPost(data[0]);
    },
  };
};

export type PostsApi = ReturnType<typeof createPostsApi>;
