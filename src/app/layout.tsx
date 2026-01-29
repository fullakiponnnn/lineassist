import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnapKarte | 美容室向けLINE自動連携CRM | 顧客管理・カルテアプリ",
  description: "美容室のためのLINE連携CRM「SnapKarte（スナップカルテ）」。施術写真を撮影するだけで、自動でお客様のLINEにお礼メッセージと写真を送信。リピート率向上と業務効率化を同時に実現します。",
  keywords: ["美容室 CRM", "LINE連携", "電子カルテ", "美容師 アプリ", "顧客管理", "リピート率向上", "業務効率化"],
  openGraph: {
    title: "SnapKarte | 美容室向けLINE自動連携CRM",
    description: "写真撮影で簡単カルテ作成。LINEで自動リマインド。美容室の業務を劇的に効率化します。",
    url: "https://snapkarte.com", // Replace with actual domain
    siteName: "SnapKarte",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SnapKarte OG Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapKarte | 美容室向けLINE連携CRM",
    description: "撮影するだけで、お客様に感動を。美容室向け自動連携カルテアプリ。",
    images: ["/og-image.png"], // Assuming you will add this image
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SnapKarte",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
