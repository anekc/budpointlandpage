import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./nocturno.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const SITE_URL = "https://budpoint.app";
const TITLE = "Budpoint: budgets and shared expenses for iPhone";
const DESCRIPTION = "Track your spending, budgets and shared expenses on iPhone. Split a bill and only your share counts in your budget. Free beta on TestFlight.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["budget app", "expense tracker", "split expenses", "personal finance", "iPhone", "presupuesto", "gastos compartidos", "finanzas personales"],
  authors: [{ name: "Budpoint" }],
  creator: "Budpoint",
  publisher: "Budpoint",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Budpoint",
    type: "website",
    locale: "en_US",
    alternateLocale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    // Status bar colors are the theme-color metas in <head>, kept in sync by ThemeContext
    'color-scheme': 'light dark',
    'apple-mobile-web-app-capable': 'yes',
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
        <meta name="theme-color" content="#F4F5F7" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0D0E12" media="(prefers-color-scheme: dark)" />
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
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased preload`}
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.body.classList.remove("preload");
                var ua = navigator.userAgent.toLowerCase();
                if (ua.indexOf('safari') > -1 && ua.indexOf('chrome') === -1 && ua.indexOf('crios') === -1 && ua.indexOf('fxios') === -1 && ua.indexOf('edgios') === -1) {
                  document.documentElement.classList.add('safari-browser');
                }
              })();
            `
          }}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
