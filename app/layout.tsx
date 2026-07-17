import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const interSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Rishi Raj",
  description: "Personal website on rishiraj.ch — built with Next.js, TypeScript & Tailwind, deployed on Vercel.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get('x-locale') ?? 'en';

  return (
    <html lang={locale}>
      <body className={`${interSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
