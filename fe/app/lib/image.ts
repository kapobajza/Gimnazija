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
