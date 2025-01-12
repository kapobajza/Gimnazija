import { CheckIcon as CheckLineIcon } from "@heroicons/react/24/solid";
import type { ReactNode } from "react";

const BulletPoint = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-1 flex">
      <CheckLineIcon className="mr-1 mt-0.5 size-5 shrink-0 fill-green" />
      <span className="text-md text-foreground dark:text-slate-400">
        {children}
      </span>
    </div>
  );
};

const SectionChecklist = () => {
  return (
    <section className="pb-28">
      <div className="container relative z-10 -mt-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-md bg-white px-6 py-16 text-center shadow-lg dark:bg-slate-800 dark:shadow-slate-850/20 sm:px-12">
            <h3 className="mb-6">
              Gimnazija kroz stoljeća. Čuvari tradicije i oslonac budućim
              generacijama
            </h3>
            <div className="flex flex-wrap text-left md:flex-nowrap md:space-x-10">
              <div className="w-full md:w-1/2">
                <BulletPoint>
                  Čuvamo tradiciju i izvrsnost u obrazovanju
                </BulletPoint>
                <BulletPoint>
                  Podržavamo akademski i lični razvoj učenika
                </BulletPoint>
              </div>
              <div className="w-full md:w-1/2">
                <BulletPoint>
                  Gradimo inkluzivno i motivirajuće okruženje
                </BulletPoint>
                <BulletPoint>
                  Unapređujemo nastavu i školske resurse
                </BulletPoint>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionChecklist;
