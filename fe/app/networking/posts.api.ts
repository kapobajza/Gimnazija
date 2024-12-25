import { sanitizeHtml } from '@/lib/utils';
import { createApi } from '@/networking/api';
import { WPMedia, WPMediaSizes } from '@/types/api/media.type';
import { Post, PostDTO } from '@/types/api/post.type';
import { AppErrorCode } from './error';

function stripHtmlTags(html: string | undefined) {
  if (!html) {
    return '';
  }

  return html.replace(/<\/?[^>]+(>|$)/g, '').trim();
}

export const createPostsApi = () => {
  const postsApi = createApi({
    routePrefix: 'posts',
  });

  function getMediaWidth(media: WPMediaSizes | undefined, size: keyof WPMediaSizes) {
    return media?.[size]?.width ?? media?.full?.width ?? 0;
  }

  async function getFormattedPost(post: Post): Promise<PostDTO> {
    const imageLink = post._links?.['wp:featuredmedia']?.[0];
    let media: PostDTO['image'] | undefined;

    if (imageLink) {
      try {
        const res = await fetch(imageLink.href);
        const json = (await res.json()) as WPMedia;

        media = {
          alt: json.alt_text,
          sizes: json.media_details.sizes,
          url: `/images?w=${getMediaWidth(json.media_details.sizes, 'medium_large')}&src=${json.source_url}`,
        };
      } catch {
        media = undefined;
      }
    }

    return {
      ...post,
      title: {
        ...post.title,
        rendered: sanitizeHtml(post.title.rendered),
        stripped: stripHtmlTags(post.title.rendered),
      },
      excerpt: {
        ...post.excerpt,
        rendered: sanitizeHtml(post.excerpt?.rendered),
        stripped: stripHtmlTags(post.excerpt?.rendered),
      },
      image: media,
    };
  }

  return {
    async get(limit = 10, offset = 0): Promise<PostDTO[]> {
      const { data } = await postsApi.get<Post[]>('', {
        queryParams: {
          per_page: limit,
          offset,
        },
      });

      return Promise.all(data.map(getFormattedPost));
    },
    async getBySlug(slug: string): Promise<PostDTO> {
      const { data = [] } = await postsApi.get<Post[]>('', {
        queryParams: {
          slug,
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
