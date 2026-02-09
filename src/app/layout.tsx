import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/bottom-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.snapkarte.jp"),
  title: {
    default: "SnapKarte | 個人美容師向け無料LINE電子カルテ・顧客管理アプリ",
    template: "%s | SnapKarte",
  },
  description: "個人美容師・フリーランス・面貸し美容師のためのLINE連携電子カルテ「SnapKarte（スナップカルテ）」。施術写真を撮るだけでお礼LINEを自動送信。事務作業をゼロにし、Google口コミ収集やリピート率向上を強力にサポート。月額0円から始められる無料の顧客管理アプリ。",
  keywords: [
    "個人美容師 電子カルテ",
    "美容師 アプリ 無料",
    "LINE 電子カルテ",
    "面貸し カルテ管理",
    "フリーランス美容師 顧客管理",
    "シェアサロン CRM",
    "美容室 顧客管理 アプリ",
    "美容師 LINE連携",
    "Google口コミ 自動化",
    "リピート率向上 美容室",
  ],
  authors: [{ name: "SnapKarte" }],
  creator: "SnapKarte",
  publisher: "SnapKarte",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.snapkarte.jp",
  },
  openGraph: {
    title: "SnapKarte | 個人美容師向け無料LINE電子カルテ",
    description: "写真を撮るだけでお礼LINEが自動送信。個人美容師・フリーランスの事務作業をゼロにする、LINE連携の無料電子カルテアプリ。",
    url: "https://www.snapkarte.jp",
    siteName: "SnapKarte（スナップカルテ）",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SnapKarte - 個人美容師向けLINE連携電子カルテ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapKarte | 個人美容師向け無料LINE電子カルテ",
    description: "撮影するだけで、お客様に感動を。個人美容師・フリーランスのための自動連携カルテアプリ。",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SnapKarte",
  },
  // Uncomment when you have Google Search Console verification
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

import { createClient } from "@/utils/supabase/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        {children}
        {user && <BottomNav />}
      </body>
    </html>
  );
}
