export type ImageFormat = {
  ext: string;
  relativeUrl: string | undefined;
  url: string | undefined;
  hash: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

export type ImageMedia = {
  relativeUrl: string | undefined;
  url: string | undefined;
  alternativeText: string;
  formats: Partial<{
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
  }>;
};
