import { motion, Variants } from 'framer-motion';
import IconBox from '@/components/icon-box';
import { AcademicCapIcon, UserGroupIcon, CalculatorIcon } from '@heroicons/react/24/solid';

export const iconBoxes = [
  {
    icon: <UserGroupIcon className="fill-primary size-8" />,
    iconBase: 'bg-[#FEE8E8]',
    title: 'Prvi nastavnici nosili su teret cijele nastave',
    description:
      'Kada je škola počela sa radom 1946. godine, imala je samo dva nastavnika, Efendića Fehima i Vinković Zlatku, koji su pokrivali čak deset predmeta. Efendić je obavljao i funkciju direktora.',
    shadow: 'shadow-[0_1px_6px_rgba(61,65,84,.15),0_5px_0_0_#FA6262]',
  },
  {
    icon: <AcademicCapIcon className="fill-[#44D88D] size-8" />,
    iconBase: 'bg-[#E3F9EE]',
    title: 'Prva generacija maturanata',
    description:
      'Godine 1955. škola je postala osmorazredna, čime je omogućeno da učenici završe kompletno srednjoškolsko obrazovanje u Bugojnu. Prva generacija maturanata, koja je završila školovanje 1956. godine, brojala je 24 učenika, obilježavajući značajan trenutak u historiji škole.',
    shadow: 'shadow-[0_1px_6px_rgba(61,65,84,.15),0_5px_0_0_#44D88D]',
  },
  {
    icon: <CalculatorIcon className="fill-[#7444FF] size-8" />,
    iconBase: 'bg-[#EAE3FF]',
    title: 'Organizacija državnog takmičenja',
    description:
      'Gimnazija je 1998. godine bila domaćin petog državnog takmičenja iz matematike, čime je još jednom potvrdila svoj značaj u obrazovnom sistemu i kao mjesto koje podržava talente i akademsku izvrsnost.',
    shadow: 'shadow-[0_1px_6px_rgba(61,65,84,.15),0_5px_0_0_#7444FF]',
  },
];

const fadeInAnimationVariants: Variants = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

const SectionIconBoxes = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="flex justify-center">
          <div className="text-center lg:w-3/5">
            <h2 className="mb-12">
              Zanimljive <span className="text-primary">činjenice</span> o našoj školi
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-10">
          {iconBoxes.map((iconBox, index) => {
            return (
              <motion.div
                key={`${iconBox.title}-${index}`}
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{
                  delay: 0.5,
                }}
                custom={index}
              >
                <IconBox {...iconBox} className="min-h-auto lg:min-h-[460px] xl:min-h-[380px]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionIconBoxes;
