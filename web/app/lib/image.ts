import type { ImageFormat, ImageMedia } from "@/types/api/media.types";

export const generateImgSrcSet = (
  baseSrc: string,
  options?: { includeQuotes: boolean },
) => {
  const { includeQuotes = false } = options ?? {};
  const extension = baseSrc.split(".").pop();

  if (!extension) {
    return "";
  }

  const baseName = baseSrc.slice(0, -extension.length - 1);
  const quote = includeQuotes ? '"' : "";
  return `${quote}${baseSrc}${quote} 1x, ${quote}${baseName}@2x.${extension}${quote} 2x, ${quote}${baseName}@3x.${extension}${quote} 3x`;
};

function generateImageFormatUrl(
  format: ImageFormat | undefined,
  baseUrl: string,
  route: string | undefined,
): ImageFormat | undefined {
  if (!format || !route) {
    return undefined;
  }

  return {
    ...format,
    relativeUrl: `/images?src=${baseUrl}${route}`,
    url: `${baseUrl}${route}`,
  };
}

export function generateImageWithBaseUrl(
  baseUrl: string,
  media: ImageMedia,
): ImageMedia {
  return {
    ...media,
    relativeUrl: media.url ? `/images?src=${baseUrl}${media.url}` : undefined,
    url: media.url ? `${baseUrl}${media.url}` : undefined,
    formats: {
      thumbnail: generateImageFormatUrl(
        media.formats.thumbnail,
        baseUrl,
        media.formats.thumbnail?.url,
      ),
      small: generateImageFormatUrl(
        media.formats.small,
        baseUrl,
        media.formats.small?.url,
      ),
      medium: generateImageFormatUrl(
        media.formats.medium,
        baseUrl,
        media.formats.medium?.url,
      ),
    },
  };
}
