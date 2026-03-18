import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

/* Geist Sans still loaded for body/fallback use */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nodeshift.dev";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NodeShift — Full-Stack Development Team",
    template: "%s | NodeShift",
  },
  description:
    "We are a two-person full-stack development team building modern web applications with React, Next.js, and TypeScript.",
  openGraph: {
    title: "NodeShift — Full-Stack Development Team",
    description:
      "We are a two-person full-stack development team building modern web applications with React, Next.js, and TypeScript.",
    url: SITE_URL,
    siteName: "NodeShift Portfolio",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "NodeShift" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NodeShift — Full-Stack Development Team",
    description:
      "We are a two-person full-stack development team building modern web applications with React, Next.js, and TypeScript.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#0a0a0a" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} bg-[#0a0a0a] text-[#f5f5f5] antialiased`}>
        <Navbar />
        <main className="pt-[60px]">{children}</main>
      </body>
    </html>
  );
}
