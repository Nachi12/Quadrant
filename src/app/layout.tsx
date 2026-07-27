import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quadrant | Premium Productivity",
  description: "Execution-focused workflow inspired by Elon Musk",
};

import { TopNav } from "@/components/TopNav";
import { QuickAddModal } from "@/components/QuickAddModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#F6F4F1] text-[#000000] relative overflow-x-hidden selection:bg-[#F95C4B]/20">
        {/* Background Gradients for Glassmorphism */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#E4DED2] mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-[#F95C4B] mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse"></div>
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-[#E4DED2] mix-blend-multiply filter blur-[80px] opacity-50"></div>
        </div>

        <TopNav />
        <main className="flex-1 flex flex-col overflow-hidden relative z-10">
          {children}
        </main>
        <QuickAddModal />
      </body>
    </html>
  );
}
