import type { LoaderFunction } from "react-router";
import type { ComponentPropsWithoutRef } from "react";
import sharp from "sharp";

import { HttpError } from "@/networking/error";
import { logger } from "@/lib/logger.server";

const BadImageResponse = () => {
  const buffer = Buffer.from(
    "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    "base64",
  );
  return new Response(buffer, {
    status: 500,
    headers: {
      "Cache-Control": "max-age=0",
      "Content-Type": "image/gif;base64",
      "Content-Length": buffer.length.toFixed(0),
    },
  });
};

const IMAGE_WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const DEFAULT_QUALITY = 75;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const src = url.searchParams.get("src");
  const width = url.searchParams.get("w") ?? `${IMAGE_WIDTHS[0]}`;
  const quality = url.searchParams.get("q") ?? `${DEFAULT_QUALITY}`;

  if (!src) {
    return BadImageResponse();
  }

  try {
    const image = await fetch(src);
    if (!image.ok || !image.body) {
      throw new HttpError({
        status: image.status,
        statusText: image.statusText,
        message: `fetching image failed. src: ${src}`,
      });
    }
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const resizedImage = await sharp(imageBuffer)
      .resize(parseInt(width))
      .webp({
        quality: parseInt(quality),
      })
      .toBuffer();
    return new Response(resizedImage, {
      status: 200,
      headers: {
        "Cache-Control": `max-age=${60 * 60 * 24 * 365}, public`,
        "Content-Type": "image/webp",
        "Content-Length": resizedImage.length.toFixed(0),
      },
    });
  } catch (err) {
    const stack = (err as Error | undefined)?.stack;
    logger.error(err as string, stack ?? "");
    return BadImageResponse();
  }
};

export const RemoteImage = (
  props: Omit<ComponentPropsWithoutRef<"img">, "src"> & {
    src: string;
  },
) => {
  if (!props.src) {
    throw new HttpError({ status: 400, statusText: "Missing src" });
  }
  const srcSetParts = IMAGE_WIDTHS.map(
    (width) =>
      `/images?src=${props.src}&w=${width}&q=${DEFAULT_QUALITY} ${width}w`,
  );
  return (
    <img {...props} srcSet={srcSetParts.join(", ")} src={srcSetParts[0]} />
  );
};
