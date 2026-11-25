import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tanker } from "@/lib/fonts";
import "./globals.css";
import "lenis/dist/lenis.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: { icon: [{ url: "/brand/favicon.svg", type: "image/svg+xml" }] },
  title: "Plastera | Machines Shibaura & matières premières en France",
  description:
    "Représentant exclusif Shibaura Machine en France. Équipements d’injection plastique et matières premières pour la plasturgie.",
  openGraph: {
    title: "Plastera  Machines & matières",
    description: "Deux expertises pour la plasturgie en France.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${tanker.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans selection:bg-industrial-blue selection:text-white">
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <SmoothScroll />
        <Navbar />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
