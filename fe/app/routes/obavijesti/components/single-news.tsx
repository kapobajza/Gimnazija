import FooterLayout from '@/components/layout/footer-layout';
import Header from '@/components/layout/header';
import SocialIcon from '@/routes/obavijesti/components/social-icon';
import { getFormattedDate } from '@/lib/date';
import { getPostBySlugQueryOptions } from '@/query/posts.query';
import { useQuery } from '@tanstack/react-query';
import { faFacebook, faXTwitter, faLinkedin, faReddit, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { MainNavEnum, siteConfig } from '@/config/site';

export default function SingleNewsPage({ slug }: { slug: string }) {
  const { data: post } = useQuery({
    ...getPostBySlugQueryOptions(slug),
    throwOnError: true,
  });

  if (!post) {
    return null;
  }

  const postURL = `${siteConfig.url}/${MainNavEnum.Obavijesti.href}/${post.slug}`;

  return (
    <>
      <Header />
      <main className="relative mt-[4.5rem] lg:mt-[161px]">
        <div className="relative flex flex-col items-center justify-center px-4 py-20 before:absolute before:inset-0 before:z-[1] before:bg-foreground/75 sm:h-96 lg:h-[30rem]">
          {post.image ? (
            <img
              src={post.image.url}
              alt={post.image.alt}
              className="mb-6 object-cover absolute left-0 top-0 right-0 bottom-0 h-full w-full"
            />
          ) : null}
          <div className="relative z-[1] mx-auto max-w-4xl text-center">
            <h1
              className="mb-5 text-white lg:text-5xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            ></h1>
            <span className="block text-slate-300 text-md lg:text-lg drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.2)]">
              {getFormattedDate(post.modified)}
            </span>
          </div>
        </div>
        <section className="border-b pb-24 pt-16">
          <div className="container">
            <div className="mx-auto max-w-[50rem]">
              <div className="mb-4 flex items-center">
                <span className="mb-2 mr-3 inline-block text-sm font-medium">Podijelite:</span>
                <div className="flex space-x-3">
                  <SocialIcon
                    icon={faXTwitter}
                    url={`https://twitter.com/intent/tweet?url=${postURL}&text=${encodeURI(post.title.rendered)}`}
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
                  <SocialIcon icon={faWhatsapp} url={`whatsapp://send?text=${postURL}`} className="bg-[#25d366]" />
                  <SocialIcon
                    icon={faEnvelope}
                    url={`mailto:?subject=${post.title.rendered}&body=${postURL}`}
                    className="bg-slate-500"
                  />
                </div>
              </div>
            </div>
            <article
              className="post-content prose prose-lg mx-auto max-w-[50rem] dark:prose-invert prose-headings:text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            ></article>
          </div>
        </section>
      </main>
      <FooterLayout />
    </>
  );
}
