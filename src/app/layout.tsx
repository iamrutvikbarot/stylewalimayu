import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAFAF8",
};

export const metadata: Metadata = {
  title: "Style Wali Mayu (@stylewalimayu) • Curated Budget Fashion & Lifestyle Under ₹999",
  description: "Curating budget fashion, styling hacks, ethnic kurtas, western tops, bags & aesthetic home finds under ₹999 ✨ Shop Mayu's top picks from Myntra, Ajio, Amazon, and Meesho.",
  keywords: [
    "Style Wali Mayu",
    "Mayu Fashion",
    "Indian fashion influencer",
    "budget fashion under 999",
    "Myntra kurta set finds",
    "Ajio tops",
    "Amazon fashion finds",
    "Meesho budget clothing",
    "styling hacks",
    "Wishlink store",
  ],
  authors: [{ name: "Style Wali Mayu" }],
  openGraph: {
    title: "Style Wali Mayu (@stylewalimayu) | Curated Fashion Finds Under ₹999",
    description: "Curating budget fashion, styling hacks & aesthetic finds under ₹999 ✨",
    url: "https://stylewalimayu.com",
    siteName: "Style Wali Mayu Storefront",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Style Wali Mayu (@stylewalimayu) | Storefront",
    description: "Curating budget fashion, styling hacks & aesthetic finds under ₹999 ✨",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen bg-[#FAFAF8] text-[#1F2937]">
        {children}
      </body>
    </html>
  );
}
