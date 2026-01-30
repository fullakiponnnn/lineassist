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
  title: "SnapKarte | 個人美容師・面貸し特化のLINE電子カルテ | 顧客管理・自動追客",
  description: "個人美容師・フリーランスのためのLINE連携電子カルテ「SnapKarte（スナップカルテ）」。施術写真を撮るだけでお礼LINEを自動送信。事務作業をゼロにし、Google口コミ収集やリピート率向上を強力にサポートします。月額0円から。",
  keywords: ["美容室 CRM", "個人美容師", "フリーランス美容師", "面貸し", "シェアサロン", "LINE連携 電子カルテ", "顧客管理アプリ", "Google口コミ 自動化", "リピート率向上", "業務効率化"],
  openGraph: {
    title: "SnapKarte | 個人美容師・面貸し特化のLINE電子カルテ",
    description: "スマホで撮るだけ、営業終了。個人美容師の事務作業をゼロにする、LINE連携の無料電子カルテアプリ。",
    url: "https://www.snapkarte.jp",
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
    title: "SnapKarte | 個人美容師向けLINE連携CRM",
    description: "撮影するだけで、お客様に感動を。個人美容師・フリーランスのための自動連携カルテアプリ。",
    images: ["/og-image.png"], // Assuming you will add this image
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SnapKarte",
  },
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
