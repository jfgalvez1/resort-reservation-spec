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
  title: "Paradise Beach Resort - Luxury Beachfront Experience",
  description: "Experience luxury and relaxation at Paradise Beach Resort. Book your perfect getaway with world-class amenities, pristine beaches, and exceptional service in Miami.",
  keywords: "luxury resort, beachfront hotel, Miami resort, vacation rental, luxury accommodation",
  authors: [{ name: "Paradise Beach Resort" }],
  openGraph: {
    title: "Paradise Beach Resort - Luxury Beachfront Experience",
    description: "Experience luxury and relaxation at Paradise Beach Resort. Book your perfect getaway with world-class amenities, pristine beaches, and exceptional service in Miami.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
