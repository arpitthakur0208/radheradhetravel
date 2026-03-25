"use client";

import { motion } from "framer-motion";

export function Loader() {
  return (
    <div className="flex flex-col items-center gap-4" role="status" aria-live="polite" aria-label="Loading">
      <motion.div
        className="h-12 w-12 rounded-full border-4 border-cyan-500/30 border-t-cyan-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      />
      <p className="text-sm font-medium text-foreground/70">Loading experience…</p>
    </div>
  );
}
