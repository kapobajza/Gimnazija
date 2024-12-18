import { generateImgSrcSet } from '@/lib/image';
import type { ComponentPropsWithoutRef } from 'react';

export function LocalImage({
  src,
  ...props
}: Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'srcSet'> & {
  src: string;
}) {
  return <img src={src} srcSet={generateImgSrcSet(src)} {...props} />;
}
