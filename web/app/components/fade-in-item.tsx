import type { HTMLMotionProps, Variants } from "framer-motion";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

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

export default function FadeInItem({
  children,
  ...props
}: HTMLMotionProps<"div"> & {
  children: ReactNode;
}) {
  return (
    <motion.div
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{
        delay: 0.5,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
