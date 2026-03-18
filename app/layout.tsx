import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ── Site-wide metadata ────────────────────────────────────────────────────────
// Update SITE_URL to your production domain before deploying.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourname.dev";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // TODO: replace with your team / studio name
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
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "NodeShift — Full-Stack Development Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NodeShift — Full-Stack Development Team",
    description:
      "We are a two-person full-stack development team building modern web applications with React, Next.js, and TypeScript.",
    images: [OG_IMAGE],
    // creator: "@yourteamhandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// Viewport / theme-color (dark mode optimised)
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

// ── Root layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-zinc-100`}
      >
        {children}
      </body>
    </html>
  );
}
