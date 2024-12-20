export type WPMediaSize = {
  file: string;
  width: number;
  height: number;
  filesize: number;
  mime_type: string;
  source_url: string;
};

export type WPMediaSizes = {
  medium: WPMediaSize;
  thumbnail: WPMediaSize;
  medium_large: WPMediaSize;
  full: WPMediaSize;
};

export type WPMedia = {
  link: string;
  media_details: {
    sizes: WPMediaSizes;
  };
  alt_text: string;
};
