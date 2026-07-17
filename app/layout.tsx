import type { Metadata } from "next";
import { Geist_Mono, Inter, Inter_Tight } from "next/font/google";
import { headers } from "next/headers";
import "katex/dist/katex.min.css";
import "./globals.css";

// Single neutral grotesque, done right: Inter for body/UI, Inter Tight for
// display headings, Geist Mono for metadata / code. Exposed as CSS variables
// that globals.css maps into Tailwind's font tokens.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rishiraj.ch"),
  title: "Rishi Raj",
  description:
    "Rishi Raj — theoretical & mathematical physics PhD (Sorbonne) working on scientific computing, machine learning and quantitative research.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Locale is set on the response header by proxy.ts; the root layout is the one
  // place that header is reliably available (see CLAUDE.md).
  const headersList = await headers();
  const locale = headersList.get("x-locale") ?? "en";

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${interTight.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
