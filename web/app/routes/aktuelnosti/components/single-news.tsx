import {
  faFacebook,
  faLinkedin,
  faReddit,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { MainNavEnum, siteConfig } from "@/config/site";
import { getFormattedDate } from "@/lib/date";
import { getPostBySlugQueryOptions } from "@/query/posts.query";
import SocialIcon from "@/routes/aktuelnosti/components/social-icon";
import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageLightboxContent from "@/components/image/image-lightbox-content";

export default function SingleNews({ slug }: { slug: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const { data: post } = useQuery({
    ...getPostBySlugQueryOptions(slug),
    throwOnError: true,
  });

  if (!post) {
    return null;
  }

  const postURL = `${siteConfig.url}/${MainNavEnum.Aktuelnosti.href}/${post.slug}`;
  const imageCount = post.images?.length ?? 0;

  return (
    <>
      <Header />
      <main className="relative mt-header-spacing">
        <div className="relative flex flex-col items-center justify-center px-4 py-20 before:absolute before:inset-0 before:z-[1] before:bg-foreground/65 sm:h-96 lg:h-[30rem]">
          {post.cover ? (
            <img
              src={post.cover.relativeUrl}
              alt={post.cover.alternativeText}
              className="absolute bottom-0 left-0 right-0 top-0 mb-6 h-full w-full object-cover"
            />
          ) : null}
          <div className="relative z-[1] mx-auto max-w-4xl text-center">
            <h1 className="mb-5 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] lg:text-5xl">
              {post.title}
            </h1>
            <span className="block text-md text-slate-300 drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.2)] lg:text-lg">
              {getFormattedDate(post.updatedAt)}
            </span>
          </div>
        </div>
        <section className="border-b pb-24 pt-16">
          <div className="container">
            <div className="mx-auto max-w-[50rem]">
              <article className="post-content prose prose-lg mb-6 dark:prose-invert prose-headings:text-foreground">
                <BlocksRenderer content={post.content} />
              </article>
              {post.images ? (
                <Dialog open={open} onOpenChange={setOpen}>
                  <div
                    className={cn(
                      "relative mb-6 grid",
                      imageCount === 2 && "grid-cols-2 gap-1",
                      imageCount === 3 && "grid-cols-2 gap-2 lg:grid-cols-3",
                      imageCount >= 4 && "grid-cols-2 gap-1",
                    )}
                  >
                    {post.images.slice(0, 4).map((img, index) => (
                      <DialogTrigger
                        key={`${img.relativeUrl}-${index}`}
                        onClick={() => {
                          setCurrentIndex(index);
                        }}
                        asChild
                      >
                        <div
                          className={cn(
                            "cursor-pointer",
                            imageCount === 3 &&
                              index === 2 &&
                              "col-span-2 lg:col-auto",
                            imageCount >= 4 && index === 3 && "relative",
                          )}
                        >
                          <AspectRatio ratio={1}>
                            <img
                              src={img.formats.medium?.relativeUrl}
                              alt="Gallery image"
                              className="absolute inset-0 h-full w-full rounded-md object-cover"
                            />
                          </AspectRatio>
                          {index === 3 && imageCount > 4 ? (
                            <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black bg-opacity-60">
                              <span className="text-2xl font-bold text-white">
                                +{imageCount - 4}
                              </span>
                            </div>
                          ) : null}
                        </div>
                      </DialogTrigger>
                    ))}
                  </div>
                  <ImageLightboxContent
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    images={post.images}
                    open={open}
                  />
                </Dialog>
              ) : null}
              <div>
                <span className="mb-2 mr-4 block text-md font-medium">
                  Podijelite
                </span>
                <div className="mb-4 flex items-center">
                  <div className="flex flex-wrap gap-3">
                    <SocialIcon
                      icon={faXTwitter}
                      url={`https://twitter.com/intent/tweet?url=${postURL}&text=${encodeURI(post.title)}`}
                    />
                    <SocialIcon
                      icon={faFacebook}
                      url={`https://www.facebook.com/sharer.php?u=${postURL}`}
                      className="bg-[#324e8c]"
                    />
                    <SocialIcon
                      icon={faLinkedin}
                      url={`https://www.linkedin.com/shareArticle?mini=true&url=${postURL}`}
                      className="bg-[#0a66c2]"
                    />
                    <SocialIcon
                      icon={faReddit}
                      url={`https://www.reddit.com/submit?url=${postURL}`}
                      className="bg-[#ff4500]"
                    />
                    <SocialIcon
                      icon={faWhatsapp}
                      url={`whatsapp://send?text=${postURL}`}
                      className="bg-[#25d366]"
                    />
                    <SocialIcon
                      icon={faEnvelope}
                      url={`mailto:?subject=${post.title}&body=${postURL}`}
                      className="bg-slate-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
