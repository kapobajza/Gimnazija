import { ImageMedia } from '@/types/api/media.types';

export const generateImgSrcSet = (baseSrc: string, options?: { includeQuotes: boolean }) => {
  const { includeQuotes = false } = options ?? {};
  const extension = baseSrc.split('.').pop();

  if (!extension) {
    return '';
  }

  const baseName = baseSrc.slice(0, -extension.length - 1);
  const quote = includeQuotes ? '"' : '';
  return `${quote}${baseSrc}${quote} 1x, ${quote}${baseName}@2x.${extension}${quote} 2x, ${quote}${baseName}@3x.${extension}${quote} 3x`;
};

export function generateImageWithBaseUrl(baseUrl: string, media: ImageMedia): ImageMedia {
  return {
    ...media,
    url: `${baseUrl}${media.url}`,
    formats: {
      thumbnail: {
        ...media.formats.thumbnail,
        url: `${baseUrl}${media.formats.thumbnail.url}`,
      },
      small: {
        ...media.formats.small,
        url: `${baseUrl}${media.formats.small.url}`,
      },
      medium: {
        ...media.formats.medium,
        url: `${baseUrl}${media.formats.medium.url}`,
      },
    },
  };
}
