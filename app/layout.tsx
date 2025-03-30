import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "./components/header/theme-provider";
import type { Metadata, Viewport } from "next";
import PWAScripts from "./components/pwa-scripts"; 
import PWAInstallPrompt from "./components/pwa-install-prompt";

// Separate viewport export for Next.js 15
export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

// Updated metadata without viewport/themeColor
export const metadata: Metadata = {
  title: 'TechTopia',
  description: "TechTopia is a modern and user-friendly e-commerce app designed exclusively for laptop enthusiasts. Browse, compare, and purchase top-brand laptops with ease. Featuring smart search, seamless shopping cart, secure login, and a fast, intuitive UI, TechTopia is the ultimate laptop marketplace.",
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TechTopia',
  },
  icons: {
    icon: '/icons/icon-192x192.png',
    shortcut: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Keep static meta tags here */}
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <PWAScripts /> {/* Moved to body */}
          <PWAInstallPrompt />
        </ThemeProvider>
      </body>
    </html>
  );
}