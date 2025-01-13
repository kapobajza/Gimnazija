import { LocalImage } from "@/components/image/local-image";

const SectionHeroLayout = () => {
  return (
    <div className="relative">
      <LocalImage
        src="/hero/building.jpg"
        alt="Building"
        className="object-cover object-center"
        fill
      />
      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-slate-850/45"></div>
      <section className="pb-24 pt-24 lg:pb-40 lg:pt-36">
        <div className="container relative">
          <div className="mx-auto flex flex-col items-center text-center">
            <LocalImage src="/logo/circle_logo.png" className="mb-6 size-40" />
            <h1 className="text-2xl text-white sm:text-5xl xl:text-6xl">
              <span className="inline-block bg-gradient-to-l from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Dobrodošli
              </span>
            </h1>
            <p className="mx-auto mb-7 max-w-sm text-md text-white">
              Posvećeni smo pružanju znanja, razvijanju talenata i inspiraciji
              za uspjeh u životu i karijeri
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionHeroLayout;
