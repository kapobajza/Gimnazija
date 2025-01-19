import type { ComponentProps } from "react";
import type React from "react";
import { forwardRef, useEffect, useRef } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { ImageMedia } from "@/types/api/media.types";
import { Button } from "@/components/ui/button";

const ChangeImageButton = forwardRef<
  HTMLButtonElement,
  ComponentProps<"button"> & {
    containerClasses?: string;
  }
>(({ containerClasses, className, ...props }, ref) => {
  return (
    <div
      className={cn("absolute top-1/2 z-10 -translate-y-1/2", containerClasses)}
    >
      <Button
        size="icon"
        variant="ghost"
        className={cn(
          "rounded-full bg-white text-slate-800 shadow-sm focus-visible:ring-primary",
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

ChangeImageButton.displayName = "ChangeImageButton";

export default function ImageLightboxContent({
  images,
  currentIndex,
  setCurrentIndex,
  open,
}: {
  images: ImageMedia[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  open: boolean;
}) {
  const imageCount = images.length;
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const previousButtonRef = useRef<HTMLButtonElement>(null);

  const handleImageChange = (direction: "previous" | "next") => {
    setCurrentIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? imageCount - 1 : prevIndex - 1;
      }

      return prevIndex === imageCount - 1 ? 0 : prevIndex + 1;
    });
  };

  const handlePrevious = () => {
    previousButtonRef.current?.focus();
    handleImageChange("previous");
  };

  const handleNext = () => {
    nextButtonRef.current?.focus();
    handleImageChange("next");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (open) {
        if (event.key === "ArrowLeft") {
          handlePrevious();
        } else if (event.key === "ArrowRight") {
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (imageCount === 0) {
    return null;
  }

  return (
    <DialogContent
      className={cn(
        "h-[100vh] w-full max-w-full rounded-none bg-muted dark:bg-foreground sm:rounded-none",
      )}
      onOpenAutoFocus={(e) => {
        e.preventDefault();
        nextButtonRef.current?.focus();
      }}
    >
      <VisuallyHidden>
        <DialogTitle>Image lightbox</DialogTitle>
      </VisuallyHidden>
      <VisuallyHidden>
        <DialogDescription>Image lightbox</DialogDescription>
      </VisuallyHidden>
      <AspectRatio ratio={16 / 4} className="mx-auto size-full max-w-5xl">
        <img
          src={images[currentIndex]?.relativeUrl}
          alt={
            images[currentIndex]?.alternativeText ??
            `Gallery image ${currentIndex + 1}`
          }
          className="pointer-events-none absolute inset-0 size-full object-contain"
        />
      </AspectRatio>
      {imageCount > 1 ? (
        <ChangeImageButton
          onClick={handlePrevious}
          containerClasses="left-8"
          aria-label="Previous image"
          ref={previousButtonRef}
        >
          <ChevronLeft className="h-6 w-6" />
        </ChangeImageButton>
      ) : null}
      {imageCount > 1 ? (
        <ChangeImageButton
          onClick={handleNext}
          containerClasses="right-8"
          aria-label="Next image"
          ref={nextButtonRef}
        >
          <ChevronRight className="h-6 w-6" />
        </ChangeImageButton>
      ) : null}
    </DialogContent>
  );
}
