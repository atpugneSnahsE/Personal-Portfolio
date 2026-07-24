"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
};

export default function FadeIn({
  children,
  delay = 0,
  y = 24,
}: FadeInProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: shouldReduce ? 0 : y,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0,
        margin: "0px 0px -60px 0px",
      }}
      transition={{
        type: "spring",
        bounce: 0,
        duration: shouldReduce ? 0 : 0.6,
        delay: shouldReduce ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}