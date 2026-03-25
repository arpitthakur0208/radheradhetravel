"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { DarkModeToggle } from "./DarkModeToggle";

const links = [
  { href: "#home", label: "Home" },
  { href: "#vehicles", label: "Vehicles" },
  { href: "#destinations", label: "Destinations" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-4 py-3 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/40"
          aria-label="Main"
        >
          <Link
            href="#home"
            className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl"
          >
            Radhe Radhe Travels
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-white/20 hover:text-foreground dark:hover:bg-white/10"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <button
              type="button"
              className="inline-flex rounded-xl border border-white/20 bg-white/10 p-2 backdrop-blur-md md:hidden dark:border-white/10"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-2 overflow-hidden rounded-2xl border border-white/20 bg-white/90 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95 md:hidden"
            >
              <ul className="flex flex-col py-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="block px-4 py-3 text-sm font-medium hover:bg-white/50 dark:hover:bg-white/10"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
