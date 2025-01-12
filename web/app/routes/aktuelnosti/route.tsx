import type { MetaFunction } from "react-router";
import { useParams } from "react-router";

import RouteError from "@/components/route-error";
import { generateCommonMetaTags } from "@/lib/utils";
import { getAllPostsOptions } from "@/query/posts.query";
import { dehydrateInfiniteQueryOnServer } from "@/query/util";

import AllNews from "./components/all-news";
import SingleNews from "./components/single-news";

export async function loader() {
  return dehydrateInfiniteQueryOnServer(getAllPostsOptions());
}

export const meta: MetaFunction = () => {
  return generateCommonMetaTags({
    title: "Aktuelnosti",
    description: "Aktuelnosti MSŠ Gimnazije Bugojno",
  });
};

export default function NewsPage() {
  const { slug } = useParams();

  if (!slug || slug.trim() === "") {
    return <AllNews />;
  }

  return <SingleNews slug={slug} />;
}

export function ErrorBoundary() {
  return <RouteError />;
}
