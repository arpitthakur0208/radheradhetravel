"use client";

import reviewsData from "@/data/reviews.json";
import type { Review } from "@/types";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Car, Headphones, MapPin, Quote, Star, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const reviews = reviewsData as Review[];

/** Portrait fallbacks when local `/images/reviews/*.jpg` are not yet added. */
const AVATAR_FALLBACKS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
] as const;

const stats = [
  { icon: Users, label: "Happy Travelers", value: 500, suffix: "+" },
  { icon: Star, label: "Average Rating", value: 4.9, suffix: "★", decimals: 1 },
  { icon: MapPin, label: "Mountain Trips", value: 120, suffix: "+" },
  { icon: Headphones, label: "Support", value: 24, suffix: "/7", isSupport: true },
] as const;

function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  isSupport = false,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  isSupport?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState(isSupport ? "0" : decimals ? "0.0" : "0");

  useEffect(() => {
    if (!inView) return;
    motionVal.set(value);
  }, [inView, motionVal, value]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (isSupport) {
        setDisplay(String(Math.round(v)));
        return;
      }
      setDisplay(decimals ? v.toFixed(decimals) : String(Math.round(v)));
    });
    return unsub;
  }, [spring, decimals, isSupport]);

  return (
    <span ref={ref} className="font-display text-3xl font-bold tabular-nums text-foreground sm:text-4xl">
      {isSupport ? (
        <>
          {display}
          <span className="text-cyan-600 dark:text-cyan-400">{suffix}</span>
        </>
      ) : (
        <>
          {display}
          {suffix}
        </>
      )}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.25 }}
          whileHover={{ scale: 1.15 }}
          className="inline-flex"
        >
          <Star
            className={`h-4 w-4 transition-colors ${
              i < rating
                ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                : "fill-slate-300/40 text-slate-300/40 dark:fill-slate-600 dark:text-slate-600"
            }`}
            strokeWidth={1.5}
          />
        </motion.span>
      ))}
    </div>
  );
}

function ProfileAvatar({ review, index }: { review: Review; index: number }) {
  const [src, setSrc] = useState(review.image);
  const fallback = AVATAR_FALLBACKS[index % AVATAR_FALLBACKS.length];
  const isRemote = src.startsWith("http");

  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-cyan-400/40 shadow-lg shadow-cyan-500/20 ring-2 ring-white/20 dark:ring-white/10">
      <Image
        src={src}
        alt={review.name}
        fill
        className="object-cover"
        sizes="56px"
        loading="lazy"
        unoptimized={isRemote}
        onError={() => {
          if (src !== fallback) setSrc(fallback);
        }}
      />
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/25 bg-white/15 p-6 shadow-xl shadow-cyan-500/5 backdrop-blur-xl transition-shadow duration-300 hover:border-cyan-400/35 hover:shadow-2xl hover:shadow-cyan-500/15 dark:border-white/10 dark:bg-slate-900/45 dark:hover:border-cyan-500/30"
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl transition-opacity group-hover:opacity-100" />
      <Quote
        className="absolute right-5 top-5 h-8 w-8 text-cyan-500/20 transition-colors group-hover:text-cyan-500/35 dark:text-cyan-400/25"
        aria-hidden
      />

      <div className="relative flex items-start gap-4">
        <ProfileAvatar review={review} index={index} />
        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="font-display text-lg font-semibold text-foreground">{review.name}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-cyan-700 dark:text-cyan-400">
            <MapPin className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
            <span className="truncate">{review.location}</span>
          </p>
        </div>
      </div>

      <div className="relative mt-4">
        <StarRating rating={review.rating} />
      </div>

      <p className="relative mt-4 flex-1 text-sm leading-relaxed text-foreground/85">
        &ldquo;{review.review}&rdquo;
      </p>

      {review.vehicle ? (
        <p className="relative mt-5 flex items-center gap-2 border-t border-white/20 pt-4 text-xs font-medium uppercase tracking-wider text-foreground/60 dark:border-white/10">
          <Car className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" aria-hidden />
          {review.vehicle}
        </p>
      ) : null}
    </motion.article>
  );
}

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-slate-100 via-cyan-50/25 to-slate-50 py-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[min(100%,48rem)] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl dark:bg-cyan-500/10" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Trust stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="rounded-2xl border border-white/25 bg-white/20 p-5 text-center shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/50"
            >
              <stat.icon className="mx-auto mb-2 h-6 w-6 text-cyan-600 dark:text-cyan-400" aria-hidden />
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimals={"decimals" in stat ? stat.decimals : 0}
                isSupport={"isSupport" in stat ? stat.isSupport : false}
              />
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-foreground/65">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Premium header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mt-16 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Testimonials
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-slate-900 via-cyan-700 to-teal-700 bg-clip-text text-transparent dark:from-white dark:via-cyan-300 dark:to-teal-300">
              What Our Travelers Say
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/75 sm:text-lg">
            Real experiences from travelers who explored Himachal Pradesh and Leh Ladakh with Radhe
            Radhe Travels.
          </p>
        </motion.div>

        {/* Desktop grid */}
        <div className="mt-12 hidden gap-6 md:grid md:grid-cols-3">
          {reviews.map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} />
          ))}
        </div>

        {/* Mobile swiper */}
        <div className="mt-10 md:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1.08}
            centeredSlides
            loop
            speed={600}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            className="testimonials-swiper !pb-10"
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={review.name} className="!h-auto">
                <ReviewCard review={review} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
