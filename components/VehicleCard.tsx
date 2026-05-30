"use client";

import { ImagePreviewModal } from "@/components/ImagePreviewModal";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Vehicle } from "@/types";

type Props = { vehicle: Vehicle; index: number };

function ZoomIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
    </svg>
  );
}

export function VehicleCard({ vehicle, index }: Props) {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay: index * 0.06 }}
        whileHover={{ y: -6 }}
        className="group overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/40"
      >
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          className="group/image relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden text-left"
          aria-label={`Preview ${vehicle.name} photo`}
        >
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover transition duration-500 group-hover/image:scale-105"
            style={vehicle.imagePosition ? { objectPosition: vehicle.imagePosition } : undefined}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
          <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-slate-950/50 text-white opacity-0 backdrop-blur-sm transition group-hover/image:opacity-100">
            <ZoomIcon className="h-4 w-4" />
          </span>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <h3 className="font-display text-xl font-semibold text-white">{vehicle.name}</h3>
          </div>
        </button>
        <div className="p-5">
          <p className="text-sm leading-relaxed text-foreground/80">{vehicle.description}</p>
        </div>
      </motion.article>

      <ImagePreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        src={vehicle.image}
        alt={vehicle.name}
        caption={vehicle.name}
      />
    </>
  );
}
