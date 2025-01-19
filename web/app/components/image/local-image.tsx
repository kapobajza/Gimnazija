import type { ComponentPropsWithoutRef } from "react";

import { generateImgSrcSet } from "@/lib/image";
import { cn } from "@/lib/utils";

export function LocalImage({
  src,
  className,
  fill,
  ...props
}: Omit<ComponentPropsWithoutRef<"img">, "src" | "srcSet"> & {
  src: string;
  fill?: boolean;
}) {
  return (
    <img
      src={src}
      srcSet={generateImgSrcSet(src)}
      className={cn(
        className,
        fill &&
          "absolute bottom-0 left-0 right-0 top-0 h-full w-full text-transparent",
      )}
      alt="local"
      {...props}
    />
  );
}
