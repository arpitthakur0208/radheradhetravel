"use client";

import { motion } from "framer-motion";

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function SectionHeading({ eyebrow, title, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="text-center"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">{eyebrow}</p>
      <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-foreground/75">{subtitle}</p>
    </motion.div>
  );
}
