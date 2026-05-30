"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  caption?: string;
};

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function ImagePreviewModal({ open, onClose, src, alt, caption }: Props) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Image preview: ${alt}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-slate-950/92 backdrop-blur-md" />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 sm:right-6 sm:top-6"
            aria-label="Close preview"
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          <motion.figure
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative max-h-[85vh] min-h-[12rem] overflow-hidden rounded-2xl border border-white/15 bg-slate-900/50 shadow-2xl shadow-cyan-500/10">
              <Image
                src={src}
                alt={alt}
                width={1600}
                height={1000}
                className="mx-auto h-auto max-h-[85vh] w-full object-contain"
                sizes="100vw"
                priority
              />
            </div>
            {caption ? (
              <figcaption className="mt-4 text-center font-display text-lg font-semibold text-white sm:text-xl">
                {caption}
              </figcaption>
            ) : null}
          </motion.figure>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
