import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "개발자 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className={`${geist.className} bg-gray-50 min-h-full`}>
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
