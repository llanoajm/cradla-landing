import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Raleway } from 'next/font/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
});


export const metadata: Metadata = {
  title: "Cradla",
  description: "Best-in-class Mental Health Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${raleway.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
