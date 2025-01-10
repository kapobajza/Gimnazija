import { BlocksContent } from '@strapi/blocks-react-renderer';
import { Category } from './category.types';
import { ImageMedia } from './media.types';

export type Post = {
  documentId: string;
  title: string;
  slug: string;
  content: BlocksContent;
  categories: Category[];
  cover: ImageMedia | undefined;
  updatedAt: string;
  images: ImageMedia[] | undefined;
};

export type PostDTO = Post & {
  excerpt: string;
};
