import type { MetaFunction } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import Header from "@/components/layout/header";
import SectionPageTitle from "@/components/sections/section-page-title";
import Footer from "@/components/layout/footer";
import { generateCommonMetaTags } from "@/lib/utils";
import { dehydrateQueryOnServer } from "@/query/util";
import { getAllEmployeesQueryOptions } from "@/query/employees.query";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog } from "@/components/ui/dialog";
import ImageLightboxContent from "@/components/image/image-lightbox-content";
import type { ImageMedia } from "@/types/api/media.types";

import StaffCard from "./components/staff-card";

export function loader() {
  return dehydrateQueryOnServer(getAllEmployeesQueryOptions());
}

export const meta: MetaFunction = () => {
  return generateCommonMetaTags({
    title: "Naši uposlenici",
    description: "Uposlenici MSŠ Gimnazije Bugojno",
  });
};

export default function TeamPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageMedia>();
  const { data, isLoading } = useQuery(getAllEmployeesQueryOptions());

  return (
    <>
      <Header />
      <main className="relative">
        <SectionPageTitle subtitle="Predani uposlenici koji svojim radom oblikuju obrazovanje i stvaraju inspirativno okruženje za učenike. Svaki član tima doprinosi uspjehu škole i budućim generacijama lidera.">
          Naši uposlenici
        </SectionPageTitle>
        <section className="border-b py-24">
          <div className="container">
            {isLoading || !data ? (
              <Skeleton />
            ) : (
              <Dialog open={open} onOpenChange={setOpen}>
                {data.map((group) => (
                  <div key={group.group.documentId}>
                    <h2 className="text-center text-xl dark:text-slate-300 sm:text-left sm:text-2xl">
                      {group.group.name}
                    </h2>
                    <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {group.employees.map((member) => (
                        <StaffCard
                          member={member}
                          key={member.documentId}
                          onClick={(member) => {
                            setSelectedImage(member.picture);
                            setOpen(true);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}

                <ImageLightboxContent
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  open={open}
                  images={selectedImage ? [selectedImage] : []}
                />
              </Dialog>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
