import type { MetaFunction } from "react-router";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SectionPageTitle from "@/components/sections/section-page-title";
import { generateCommonMetaTags } from "@/lib/utils";

import SectionChecklist from "./components/section-checklist";
import SectionHistory from "./components/section-history";

export const meta: MetaFunction = () => {
  return generateCommonMetaTags({
    title: "O nama",
    description: "Kratki osvrt na MSŠ Gimnaziju Bugojno",
  });
};

export default function About() {
  return (
    <>
      <Header />
      <main className="relative">
        <SectionPageTitle subtitle="Više od pola vijeka tradicije i obrazovanja. Mjesto gdje prošlost susreće budućnost, gdje se oblikuju generacije lidera i gdje znanje postaje temelj za životne uspjehe.">
          O nama
        </SectionPageTitle>
        <SectionChecklist />
        <SectionHistory />
      </main>
      <Footer />
    </>
  );
}
