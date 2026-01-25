import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Budpoint - Smart Finance App for iOS",
  description: "Take control of your finances with Budpoint. Smart budgeting, expense tracking, and financial analytics designed for today's economy. Coming soon to iOS.",
  keywords: ["budgeting", "finance", "iOS app", "expense tracking", "financial planning", "money management"],
  authors: [{ name: "Budpoint Team" }],
  creator: "Budpoint",
  publisher: "Budpoint",
  openGraph: {
    title: "Budpoint - Smart Finance App for iOS",
    description: "Take control of your finances with Budpoint. Smart budgeting, expense tracking, and financial analytics designed for today's economy.",
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Budpoint - Smart Finance App for iOS",
    description: "Take control of your finances with Budpoint. Smart budgeting, expense tracking, and financial analytics designed for today's economy.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    // Mobile status bar theming
    'theme-color': '#ffffff',
    'color-scheme': 'light dark',
    // iOS Safari specific
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    // Android Chrome specific
    'mobile-web-app-capable': 'yes',
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
        {/* Dynamic theme color meta tags for mobile status bar */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        {/* iOS Safari status bar styling */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Viewport meta for proper mobile rendering */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* Anti-FOUC Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('budpoint-theme') === 'dark' || (!('budpoint-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased preload`}
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `document.addEventListener("DOMContentLoaded", function() { document.body.classList.remove("preload"); });`
          }}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
