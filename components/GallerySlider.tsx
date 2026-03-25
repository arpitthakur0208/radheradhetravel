"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=85",
    alt: "Snow-covered Himalayan peaks",
  },
  {
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85",
    alt: "Mountain road journey",
  },
  {
    src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1600&q=85",
    alt: "SUV on scenic route",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85",
    alt: "Alpine landscape and peaks",
  },
];

export function GallerySlider() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-xl dark:border-white/10"
    >
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop
        speed={900}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="gallery-swiper aspect-[16/9] w-full md:aspect-[21/9]"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.src} className="relative !h-auto">
            <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
              <Image
                src={s.src}
                alt={s.alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
