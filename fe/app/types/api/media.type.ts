export type WPMediaSize = {
  file: string;
  width: number;
  height: number;
  filesize: number;
  mime_type: string;
  source_url: string;
};

export type WPMediaSizes = {
  medium: WPMediaSize | undefined;
  thumbnail: WPMediaSize | undefined;
  medium_large: WPMediaSize | undefined;
  full: WPMediaSize | undefined;
};

export type WPMedia = {
  link: string;
  media_details: {
    sizes: WPMediaSizes;
  };
  alt_text: string;
  guid: {
    rendered: string;
  };
  source_url: string;
};
