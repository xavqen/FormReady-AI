import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { MobileCTA } from "@/components/mobile-cta";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: { default: `${siteConfig.name} - Photo, Signature & PDF Resize`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: [{ rel: "icon", url: "/favicon.svg" }],
  verification: {
    // Only paste the string inside the content="..." attribute
    google: 't6vNWWPIElU-JxUI1qO1MUARshpmRQGlZrRC2oVNFqU', 
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {adsenseId ? <Script async strategy="afterInteractive" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`} crossOrigin="anonymous" /> : null}
        <ThemeProvider>
          <Header />
          <main className="min-h-screen pb-20 sm:pb-0">{children}</main>
          <Footer />
          <MobileCTA />
        </ThemeProvider>
      </body>
    </html>
  );
}
