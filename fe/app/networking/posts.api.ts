import { createApi } from '@/networking/api';
import { WPMedia } from '@/types/api/media.type';
import { Post, PostDTO } from '@/types/api/post.type';

export const createPostsApi = () => {
  const postsApi = createApi({
    routePrefix: 'posts',
  });

  return {
    async get(limit = 10): Promise<PostDTO[]> {
      const { data } = await postsApi.get<Post[]>('', {
        queryParams: {
          per_page: limit,
        },
      });

      const postsPromises = data.map<Promise<PostDTO>>(async (post) => {
        const imageLink = post._links?.['wp:featuredmedia']?.[0];
        let media: PostDTO['image'] | undefined;

        if (imageLink) {
          try {
            const res = await fetch(imageLink.href);
            const json = (await res.json()) as WPMedia;
            media = {
              alt: json.alt_text,
              sizes: json.media_details.sizes,
              url: `/images?src=${json.link}&w=${json.media_details.sizes.medium_large.width}`,
            };
          } catch {
            media = undefined;
          }
        }

        return {
          ...post,
          image: media,
        };
      });

      return Promise.all(postsPromises);
    },
  };
};

export type PostsApi = ReturnType<typeof createPostsApi>;
