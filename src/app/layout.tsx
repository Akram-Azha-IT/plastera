import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import "lenis/dist/lenis.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = localFont({
  src: [
    {
      path: "../../public/fonts/montserrat-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/montserrat-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
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
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#080808] font-sans selection:bg-industrial-blue selection:text-white">
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
