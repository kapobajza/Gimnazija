import type { MetaFunction } from "react-router";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import SectionHeroLayout from "@/components/sections/section-hero-layout";
import SectionIconBoxes from "@/components/sections/section-icon-boxes";
import { generateCommonMetaTags } from "@/lib/utils";
import { getHomePostsOptions } from "@/query/posts.query";
import { dehydrateQueryOnServer } from "@/query/util";

import SectionLatestNews from "./components/section-latest-news";

export const meta: MetaFunction = () => {
  return generateCommonMetaTags({
    title: "Početna",
    description: "Dobrodošli u Mješovitu srednju školu Bugojno!",
  });
};

export async function loader() {
  return dehydrateQueryOnServer(getHomePostsOptions());
}

export default function Index() {
  return (
    <>
      <Header />
      <main className="relative mt-header-spacing">
        <SectionHeroLayout />
        <SectionIconBoxes />
        <SectionLatestNews />
      </main>
      <Footer />
    </>
  );
}
