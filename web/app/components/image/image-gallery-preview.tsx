import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { ImageMedia } from '@/types/api/media.types';
import { HtmlHTMLAttributes } from 'react';

export function ImageGalleryPreview({
  images,
  ...rest
}: {
  images: ImageMedia[];
} & HtmlHTMLAttributes<HTMLDivElement>) {
  const imageCount = images.length;

  if (imageCount === 0) {
    return null;
  }

  return (
    <div {...rest}>
      <div
        className={cn(
          'relative grid',
          imageCount === 2 && 'grid-cols-2 gap-1',
          imageCount === 3 && 'grid-cols-2 gap-2 lg:grid-cols-3',
          imageCount >= 4 && 'grid-cols-2 gap-1',
        )}
      >
        {images.slice(0, 4).map((img, index) => (
          <div
            key={`${img.url}-${index}`}
            className={cn(
              'cursor-pointer',
              imageCount === 3 && index === 2 && 'col-span-2 lg:col-auto',
              imageCount >= 4 && index === 3 && 'relative',
            )}
          >
            <AspectRatio ratio={1}>
              <img
                src={img.formats.medium.url}
                alt="Gallery image"
                className="absolute inset-0 h-full w-full rounded-md object-cover"
              />
            </AspectRatio>
            {index === 3 && imageCount > 4 ? (
              <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black bg-opacity-60">
                <span className="text-2xl font-bold text-white">+{imageCount - 4}</span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
