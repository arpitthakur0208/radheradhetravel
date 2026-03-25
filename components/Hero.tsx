"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=85";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Mountain road with vehicle in the Himalayas"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-950/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-indigo-900/30" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-200/90"
        >
          Explore Himachal & Leh Ladakh with Comfort
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Radhe Radhe Travels
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-4 max-w-xl text-lg text-white/90 sm:text-xl"
        >
          Your Journey Begins Here
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-10"
        >
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:from-cyan-400 hover:to-teal-500 hover:shadow-cyan-400/40"
          >
            Book Your Ride
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
