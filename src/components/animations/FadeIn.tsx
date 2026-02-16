"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  yOffset?: number;
};

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  yOffset = 20,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStagger({ children, className = "", faster = false }: { children: React.ReactNode; className?: string; faster?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: faster ? 0.1 : 0.2,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const fadeInItem: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
