import { LocalImage } from '@/components/image/local-image';

const SectionHeroLayout = () => {
  return (
    <div className="relative">
      <LocalImage src="/hero/building.jpg" alt="Building" className="object-cover object-center" fill />
      <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full bg-slate-850/70"></div>
      <section className="pb-24 pt-24 lg:pb-40 lg:pt-36">
        <div className="container relative">
          <div className="mx-auto text-center">
            <h1 className="text-2xl text-white sm:text-5xl xl:text-6xl">
              <span className="block">Dobrodošli </span>
              <span className="inline-block bg-gradient-to-l from-primary to-primary-600 bg-clip-text text-transparent">
                <span className="block">Mješovita srednja škola</span>
                <span>Gimnazija Bugojno</span>
              </span>
            </h1>
            <p className="mx-auto mb-7 max-w-xs text-md text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionHeroLayout;
