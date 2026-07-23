import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: "19OTERO | Beat Showcase",
    template: "%s | 19OTERO",
  },

  description:
    "Original Trap, Rage & Breakcore productions by 19OTERO. Explore the latest beats and discover my catalog.",

  keywords: [
    "19OTERO",
    "music producer",
    "producer",
    "beatmaker",
    "beats",
    "trap beats",
    "rage beats",
    "breakcore",
    "instrumentals",
    "music",
  ],

  authors: [
    {
      name: "19OTERO",
    },
  ],

  creator: "19OTERO",

  openGraph: {
    title: "19OTERO | Premium Beat Showcase",
    description:
      "Original Trap, Rage & Breakcore productions by 19OTERO.",
    type: "website",
    locale: "en_US",
    siteName: "19OTERO Showcase",
  },

  twitter: {
    card: "summary_large_image",
    title: "19OTERO | Premium Beat Showcase",
    description:
      "Original Trap, Rage & Breakcore productions by 19OTERO.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
