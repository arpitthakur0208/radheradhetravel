"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Vehicle } from "@/types";

type Props = { vehicle: Vehicle; index: number };

export function VehicleCard({ vehicle, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <h3 className="font-display text-xl font-semibold text-white">{vehicle.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm leading-relaxed text-foreground/80">{vehicle.description}</p>
      </div>
    </motion.article>
  );
}
