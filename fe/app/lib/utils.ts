import { MetaDescriptor } from '@remix-run/react';
import { QueryClient } from '@tanstack/react-query';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import sanitizeHtmlFn from 'xss';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBrowser() {
  return typeof window !== 'undefined';
}

export function sanitizeHtml(html: string | undefined) {
  if (!html) {
    return '';
  }

  return sanitizeHtmlFn(html);
}

export function generateCommonMetaTags({
  title,
  description,
  image,
  url,
}: {
  title: string;
  description: string | undefined;
  image?: string;
  url?: string;
}): MetaDescriptor[] {
  const commonTags: MetaDescriptor[] = [
    { title },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ];

  if (description) {
    commonTags.push({ name: 'description', content: description });
  }

  if (url) {
    commonTags.push({ property: 'og:url', content: url });
  }

  if (image) {
    commonTags.push({ property: 'og:image', content: image });
    commonTags.push({ name: 'twitter:image', content: image });
  }

  return commonTags;
}

export const QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
