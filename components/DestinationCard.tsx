"use client";

import { ImagePreviewModal } from "@/components/ImagePreviewModal";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { DestinationPlace } from "@/types";

type Props = { place: DestinationPlace; index: number };

function ZoomIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
    </svg>
  );
}

export function DestinationCard({ place, index }: Props) {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:from-slate-800/60 dark:to-slate-900/40"
      >
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          className="group/image relative block aspect-[16/10] w-full cursor-zoom-in text-left"
          aria-label={`Preview ${place.name} photo`}
        >
          <Image
            src={place.image}
            alt={place.name}
            fill
            className="object-cover transition duration-500 group-hover/image:scale-[1.03]"
            style={place.imagePosition ? { objectPosition: place.imagePosition } : undefined}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
          <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-slate-950/50 text-white opacity-0 backdrop-blur-sm transition group-hover/image:opacity-100">
            <ZoomIcon className="h-4 w-4" />
          </span>
          <h3 className="absolute bottom-3 left-3 font-display text-lg font-semibold text-white">
            {place.name}
          </h3>
        </button>
        <p className="p-4 text-sm text-foreground/85">{place.description}</p>
      </motion.article>

      <ImagePreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        src={place.image}
        alt={place.name}
        caption={place.name}
      />
    </>
  );
}
