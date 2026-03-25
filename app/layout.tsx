import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://radheradhetravels.com"),
  title: {
    default: "Radhe Radhe Travels | Himachal & Leh Ladakh Tours",
    template: "%s | Radhe Radhe Travels",
  },
  description:
    "Explore Himachal Pradesh & Leh Ladakh with comfort. Premium SUV rentals and curated mountain journeys with Radhe Radhe Travels.",
  keywords: [
    "Himachal travel",
    "Leh Ladakh tour",
    "SUV rental Manali",
    "Spiti valley",
    "Radhe Radhe Travels",
  ],
  authors: [{ name: "Radhe Radhe Travels" }],
  openGraph: {
    title: "Radhe Radhe Travels",
    description: "Explore Himachal & Leh Ladakh with Comfort",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radhe Radhe Travels",
    description: "Explore Himachal & Leh Ladakh with Comfort",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
