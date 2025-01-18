import { dehydrate, QueryClient } from "@tanstack/react-query";
import invariant from "tiny-invariant";

import { MainNavEnum, siteConfig } from "@/config/site";
import { generateCommonMetaTags } from "@/lib/utils";
import { getPostBySlugQueryOptions } from "@/query/posts.query";
import type { PostDTO } from "@/types/api/post.types";

import type { Route } from "./+types/route";

export async function loader({ params }: Route.LoaderArgs) {
  invariant(params.slug, "Expected a slug param");

  const queryClient = new QueryClient();
  const options = getPostBySlugQueryOptions(params.slug);
  await queryClient.prefetchQuery(options);
  const post = queryClient.getQueryData<PostDTO | undefined>(options.queryKey);
  return Response.json({ dehydratedState: dehydrate(queryClient), post });
}

export default function SingleNewsPage() {
  return null;
}

export const meta = ({ data }: { data: { post: PostDTO | undefined } }) => {
  const post = data.post;

  if (post) {
    return generateCommonMetaTags({
      title: post.title,
      description: post.excerpt,
      image: post.cover?.formats.medium?.url,
      url: `${siteConfig.url}${MainNavEnum.Aktuelnosti.href}/${post.slug}`,
    });
  }

  return generateCommonMetaTags({
    title: "Obavijest",
    description: "Aktuelnosti MSŠ Gimnazije Bugojno",
  });
};
