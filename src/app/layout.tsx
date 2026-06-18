import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { LoadingGate } from "@/components/providers/LoadingGate";
import { profile } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = "https://sumaanta.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Product Manager`,
    template: `%s | ${profile.name}`,
  },
  description: profile.summary,
  keywords: [
    "Product Manager",
    "Founding Engineer",
    "0 to 1",
    "PM Portfolio",
    "Sumaanta Munde",
    "Product Strategy",
    "AI-native Product",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — Product Manager`,
    description: profile.summary,
    url: siteUrl,
    siteName: `${profile.name} Portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Product Manager`,
    description: profile.summary,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#18090b",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Product Manager",
  email: `mailto:${profile.email}`,
  url: siteUrl,
  telephone: profile.phone,
  alumniOf: "NIT Warangal",
  knowsAbout: [
    "Product Management",
    "Product Strategy",
    "User Research",
    "AI-native Prototyping",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="grain antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <LoadingGate>
            <SmoothScroll>{children}</SmoothScroll>
          </LoadingGate>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
