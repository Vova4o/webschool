import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "Go — изучаем и повторяем",
    template: "%s · Go",
  },
  description:
    "Практический маршрут по Go: короткие объяснения, оригинальные упражнения и проекты от первых программ до HTTP-сервисов.",
  applicationName: "Go — изучаем и повторяем",
  openGraph: {
    title: "Go — изучаем и повторяем",
    description:
      "Практический маршрут по Go: короткие объяснения, оригинальные упражнения и проекты.",
    locale: "ru_RU",
    type: "website",
  },
  verification: {
    yandex: "9395dce2ce9bf986",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
