import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingAssistant from "@/components/assistant/FloatingAssistant";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono", display: "swap" });

// Falls back to system font stack if no local Geist files are added.
// Drop GeistVF.woff into /public/fonts to enable, or swap for next/font/google Geist if available.
const geist = Inter({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  title: "Poovaragan S — AI Automation Builder & Backend Developer",
  description:
    "Building intelligent systems, automation workflows, scalable backend solutions, and technical content that creates impact.",
  metadataBase: new URL("https://poovaragan.dev"),
  openGraph: {
    title: "Poovaragan S — AI Automation Builder & Backend Developer",
    description:
      "Building intelligent systems, automation workflows, scalable backend solutions, and technical content that creates impact.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Poovaragan S — AI Automation Builder & Backend Developer",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jbmono.variable} ${geist.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingAssistant />
      </body>
    </html>
  );
}
