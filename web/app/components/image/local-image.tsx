import { generateImgSrcSet } from '@/lib/image';
import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef } from 'react';

export function LocalImage({
  src,
  className,
  fill,
  ...props
}: Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'srcSet'> & {
  src: string;
  fill?: boolean;
}) {
  return (
    <img
      src={src}
      srcSet={generateImgSrcSet(src)}
      className={cn(className, fill && 'absolute h-full w-full top-0 bottom-0 left-0 right-0 text-transparent')}
      {...props}
    />
  );
}
