import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin", "cyrillic"], variable: "--font-space-grotesk" });

export const viewport: Viewport = {
  themeColor: "#0B0F1E",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: {
    default: "ШТАБ — Агентство интерактивных решений",
    template: "%s | ШТАБ",
  },
  description: "Интерактивные решения для выставок, стендов и шоурумов. Мы превращаем ваш стенд из декорации в инструмент привлечения клиентов.",
  keywords: ["интерактивный стенд", "выставка", "шоурум", "digital signage", "мультимедиа", "сенсорный экран", "видеостена", "интерактивная презентация"],
  authors: [{ name: "ШТАБ" }],
  creator: "ШТАБ",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://vshtab.ru",
    title: "ШТАБ — Агентство интерактивных решений",
    description: "Интерактивные решения для выставок, стендов и шоурумов. Мы превращаем ваш стенд из декорации в инструмент привлечения клиентов.",
    siteName: "ШТАБ",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ШТАБ — Агентство интерактивных решений",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ШТАБ — Агентство интерактивных решений",
    description: "Интерактивные решения для выставок, стендов и шоурумов.",
    images: ["/og-image.jpg"],
    creator: "@vshtab",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark scroll-smooth">
      <body className={`${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
