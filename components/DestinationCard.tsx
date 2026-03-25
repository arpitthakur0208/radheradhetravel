"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { DestinationPlace } from "@/types";

type Props = { place: DestinationPlace; index: number };

export function DestinationCard({ place, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:from-slate-800/60 dark:to-slate-900/40"
    >
      <div className="relative aspect-[16/10]">
        <Image
          src={place.image}
          alt={place.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
        <h3 className="absolute bottom-3 left-3 font-display text-lg font-semibold text-white">
          {place.name}
        </h3>
      </div>
      <p className="p-4 text-sm text-foreground/85">{place.description}</p>
    </motion.article>
  );
}
