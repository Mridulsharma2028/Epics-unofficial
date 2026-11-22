import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import { AppProvider } from "@/lib/context";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-head",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AarogyaNet AI — Rural Healthcare & Pandemic Response Platform",
  description: "Prototype: patient care, AI-assisted assessment, IoT monitoring, doctor consultation, emergency response, GIS surveillance and public-health analytics in one connected platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plexSans.variable}`}>
      <body style={{ fontFamily: "var(--font-body), ui-sans-serif, system-ui, sans-serif" }}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
