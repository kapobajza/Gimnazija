import type { BlocksContent } from "@strapi/blocks-react-renderer";

import type { Category } from "./category.types";
import type { ImageMedia } from "./media.types";

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
