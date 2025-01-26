import type { Metadata } from "next";
import { Geist, Geist_Mono, Shizuru, Kirang_Haerang } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const shizuruSerif = Shizuru({
  variable: "--font-shizuru-serif",
  weight: '400',
  display: 'swap',
  subsets: ["latin"],
})

const kirang = Kirang_Haerang({
  variable: '--font-kirang',
  weight: '400',
  display: 'swap',
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "AI chatbot ✨",
  description: "simple ai chatbot powered by deepseek ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${shizuruSerif.variable} ${kirang.variable} antialiased`}
      >
        <div className="bg-orange-100" id='grain'>{children}</div>
        
      </body>
    </html>
  );
}

