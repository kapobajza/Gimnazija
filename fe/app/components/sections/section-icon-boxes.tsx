import { motion, Variants } from 'framer-motion';
import IconBox from '@/components/icon-box';
import ContactsLineIcon from 'remixicon-react/ContactsLineIcon';
import Message2LineIcon from 'remixicon-react/Message2LineIcon';
import FileTextLineIcon from 'remixicon-react/FileTextLineIcon';

export const iconBoxes = [
  {
    icon: <ContactsLineIcon className="fill-primary" size={32} />,
    iconBase: 'bg-[#FEE8E8]',
    title: 'Lorem ipsum',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, sint accusamus! Impedit magni at sint quo hic ut inventore consectetur eveniet.',
    shadow: 'shadow-[0_1px_6px_rgba(61,65,84,.15),0_5px_0_0_#FA6262]',
  },
  {
    icon: <Message2LineIcon className="fill-[#44D88D]" size={32} />,
    iconBase: 'bg-[#E3F9EE]',
    title: 'Lorem ipsum',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, sint accusamus! Impedit magni at sint quo hic ut inventore consectetur eveniet.',
    shadow: 'shadow-[0_1px_6px_rgba(61,65,84,.15),0_5px_0_0_#44D88D]',
  },
  {
    icon: <FileTextLineIcon className="fill-[#7444FF]" size={32} />,
    iconBase: 'bg-[#EAE3FF]',
    title: 'Lorem ipsum',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, sint accusamus! Impedit magni at sint quo hic ut inventore consectetur eveniet.',
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
              Lorem ipsum dolor sit, <span className="text-primary">amet consectetur</span> adipisicing elit
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-10">
          {iconBoxes.map((iconBox, index) => {
            return (
              <motion.div
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
                <IconBox {...iconBox} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionIconBoxes;
