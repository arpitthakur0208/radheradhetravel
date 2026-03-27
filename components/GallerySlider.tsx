"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useRef } from "react";
import { EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

type GallerySlide =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; alt: string; poster?: string };

/** Local clip in `/public/videos/` plus stock images and Mixkit previews. */
const slides: GallerySlide[] = [
  {
    kind: "video",
    src: "/videos/whatsapp-gallery-2026-03-28.mp4",
    poster:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85",
    alt: "Radhe Radhe Travels — gallery video",
  },
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=85",
    alt: "Snow-covered Himalayan peaks",
  },
  {
    kind: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-mountains-in-the-clouds-4814-large.mp4",
    poster:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85",
    alt: "Clouds rolling over mountain ridges",
  },
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85",
    alt: "Mountain road journey",
  },
  {
    kind: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-mountain-range-at-sunrise-4992-large.mp4",
    poster:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=85",
    alt: "Sunrise over mountain range",
  },
  {
    kind: "image",
    src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1600&q=85",
    alt: "SUV on scenic route",
  },
];

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function GallerySlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  const syncVideos = useCallback((activeIndex: number) => {
    slides.forEach((slide, i) => {
      if (slide.kind !== "video") return;
      const el = videoRefs.current.get(i);
      if (!el) return;
      if (i === activeIndex) {
        el.currentTime = 0;
        void el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
  }, []);

  const onSwiperReady = useCallback(
    (swiper: SwiperType) => {
      swiperRef.current = swiper;
      syncVideos(swiper.realIndex);
    },
    [syncVideos]
  );

  const onSlideChange = useCallback(
    (swiper: SwiperType) => {
      syncVideos(swiper.realIndex);
    },
    [syncVideos]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-xl dark:border-white/10"
    >
      <Swiper
        modules={[EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={900}
        simulateTouch
        allowTouchMove
        grabCursor
        touchRatio={1}
        threshold={8}
        touchAngle={45}
        shortSwipes
        longSwipes
        followFinger
        pagination={{ clickable: true }}
        onSwiper={onSwiperReady}
        onSlideChange={onSlideChange}
        className="gallery-swiper gallery-swiper--touch aspect-[16/9] w-full md:aspect-[21/9]"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={`gallery-slide-${i}`} className="relative !h-auto">
            <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
              {s.kind === "image" ? (
                <>
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                </>
              ) : (
                <>
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current.set(i, el);
                      else videoRefs.current.delete(i);
                    }}
                    className="gallery-video absolute inset-0 h-full w-full object-cover"
                    src={s.src}
                    poster={s.poster}
                    muted
                    playsInline
                    loop
                    controls
                    preload="metadata"
                    aria-label={s.alt}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-1 sm:px-2 md:px-4">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-slate-950/55 text-white shadow-lg backdrop-blur-md transition hover:bg-slate-950/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 md:h-12 md:w-12"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-slate-950/55 text-white shadow-lg backdrop-blur-md transition hover:bg-slate-950/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 md:h-12 md:w-12"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </motion.div>
  );
}
