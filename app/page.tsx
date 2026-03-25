import { ContactForm } from "@/components/ContactForm";
import { DestinationCard } from "@/components/DestinationCard";
import { GallerySlider } from "@/components/GallerySlider";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { VehicleCard } from "@/components/VehicleCard";
import destinationsData from "@/data/destinations.json";
import vehiclesData from "@/data/vehicles.json";
import type { DestinationRegion, Vehicle } from "@/types";

const vehicles = vehiclesData as Vehicle[];
const destinations = destinationsData as DestinationRegion[];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section
        id="vehicles"
        className="relative scroll-mt-24 bg-gradient-to-b from-slate-50 via-cyan-50/30 to-slate-100 py-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Fleet"
            title="SUV Cars"
            subtitle="Comfortable rides for high-altitude roads and long Himalayan drives."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {vehicles.map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="destinations"
        className="relative scroll-mt-24 bg-gradient-to-b from-slate-100 to-white py-20 dark:from-slate-950 dark:to-slate-900"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Discover"
            title="Destinations"
            subtitle="From Himachal’s green valleys to Ladakh’s stark beauty."
          />
          <div className="mt-14 space-y-16">
            {destinations.map((region) => (
              <div key={region.slug}>
                <h3 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                  {region.region}
                </h3>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  {region.places.map((place, i) => (
                    <DestinationCard key={place.name} place={place} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="gallery"
        className="relative scroll-mt-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 py-20 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Moments"
            title="Gallery"
            subtitle="Snow, roads, and the vehicles that take you there."
          />
          <div className="mt-10">
            <GallerySlider />
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative scroll-mt-24 bg-gradient-to-b from-slate-100 to-cyan-50/40 py-20 dark:from-slate-900 dark:to-slate-950"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Plan"
            title="Contact"
            subtitle="Tell us your dates and route — we’ll help you travel with ease."
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <ContactForm />
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/50 sm:p-8">
                <h3 className="font-display text-lg font-semibold">Get in touch</h3>
                <ul className="mt-4 space-y-3 text-sm text-foreground/90">
                  <li>
                    <span className="font-medium text-foreground">Phone:</span>{" "}
                    <a href="tel:+91XXXXXXXXXX" className="text-cyan-600 hover:underline dark:text-cyan-400">
                      +91 XXXXXXXX
                    </a>
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Email:</span>{" "}
                    <a
                      href="mailto:info@radheradhetravels.com"
                      className="text-cyan-600 hover:underline dark:text-cyan-400"
                    >
                      info@radheradhetravels.com
                    </a>
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Location:</span> Himachal Pradesh, India
                  </li>
                </ul>
              </div>
              <div className="overflow-hidden rounded-3xl border border-white/20 shadow-xl dark:border-white/10">
                <iframe
                  title="Himachal Pradesh on Google Maps"
                  src="https://maps.google.com/maps?q=Himachal+Pradesh,+India&hl=en&z=7&output=embed"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="min-h-[280px] w-full bg-slate-200 dark:bg-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
