import type { Metadata } from "next";
import { Italiana, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { companyInfo } from "@/data/company";
import Script from "next/script";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${companyInfo.name} | ${companyInfo.tagline}`,
  description: companyInfo.description,
  keywords: "leather repair, leather restoration, handbag recoloring, shoe repair, belt repair, jacket repair, furniture leather, auto interior leather, luxury leather care",
  verification: {
    google: "hcRDGATPrnXfjikFQlOY2TE_74YD_KmRXDvGE-GNZZo",
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
        className={`${josefinSans.variable} ${italiana.variable} antialiased bg-background text-foreground flex flex-col min-h-screen font-sans`}
      >
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-S59QLN85K4"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S59QLN85K4');
          `}
        </Script>
        <SplashScreen />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
