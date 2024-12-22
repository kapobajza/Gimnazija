import { WPMediaSizes } from './media.type';

export type Post = {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
    stripped: string;
  };
  content: {
    rendered: string;
  };
  _links:
    | {
        'wp:featuredmedia':
          | {
              href: string;
            }[]
          | undefined;
      }
    | undefined;
  modified: string;
  excerpt:
    | {
        rendered: string;
        stripped: string;
      }
    | undefined;
};

export type PostDTO = Omit<Post, '_links'> & {
  image:
    | {
        url: string;
        sizes: WPMediaSizes;
        alt: string;
      }
    | undefined;
};
