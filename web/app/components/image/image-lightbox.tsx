import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ImageMedia } from '@/types/api/media.types';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ComponentProps, useEffect, useState } from 'react';

function ChangeImageButton({
  containerClasses,
  className,
  ...props
}: ComponentProps<'button'> & {
  containerClasses?: string;
}) {
  return (
    <div className={cn('absolute top-1/2 z-10 -translate-y-1/2', containerClasses)}>
      <Button
        size="icon"
        variant="ghost"
        className={cn('rounded-full bg-white text-slate-800 shadow-sm focus-visible:ring-primary', className)}
        {...props}
      />
    </div>
  );
}

export function ImageGallery({ images, className }: { images: ImageMedia[]; className?: string }) {
  const imageCount = images.length;
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (imageCount === 0) {
    return null;
  }

  const handleImageChange = (direction: 'previous' | 'next') => {
    setCurrentIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? imageCount - 1 : prevIndex - 1;
      }

      return prevIndex === imageCount - 1 ? 0 : prevIndex + 1;
    });
  };

  const handlePrevious = () => {
    handleImageChange('previous');
  };

  const handleNext = () => {
    handleImageChange('next');
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (open) {
        if (event.key === 'ArrowLeft') {
          handlePrevious();
        } else if (event.key === 'ArrowRight') {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handlePrevious, handleNext]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        className={cn(
          'relative grid',
          imageCount === 2 && 'grid-cols-2 gap-1',
          imageCount === 3 && 'grid-cols-2 gap-2 lg:grid-cols-3',
          imageCount >= 4 && 'grid-cols-2 gap-1',
          className,
        )}
      >
        {images.slice(0, 4).map((img, index) => (
          <DialogTrigger
            key={`${img.url}-${index}`}
            onClick={() => {
              setCurrentIndex(index);
            }}
            asChild
          >
            <div
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
          </DialogTrigger>
        ))}
      </div>
      <DialogContent className={cn('h-[70vh] max-w-4xl')}>
        <VisuallyHidden>
          <DialogTitle>Image lightbox</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden>
          <DialogDescription>Image lightbox</DialogDescription>
        </VisuallyHidden>
        <AspectRatio ratio={16 / 9} className="size-full">
          <img
            src={images[currentIndex]?.url}
            alt={images[currentIndex]?.alternativeText ?? 'Image'}
            className="absolute inset-0 size-full object-contain"
          />
        </AspectRatio>
        <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
          <Button
            size="icon"
            variant="ghost"
            onClick={handlePrevious}
            aria-label="Previous image"
            className="rounded-full bg-white text-slate-800 shadow-sm focus-visible:ring-primary"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        <ChangeImageButton onClick={handlePrevious} containerClasses="left-4">
          <ChevronLeft className="h-6 w-6" />
        </ChangeImageButton>
        <ChangeImageButton onClick={handleNext} containerClasses="right-4">
          <ChevronRight className="h-6 w-6" />
        </ChangeImageButton>
      </DialogContent>
    </Dialog>
  );
}
