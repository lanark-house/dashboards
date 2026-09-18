import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Frame Art Dashboard",
  description: "Artistic portrait smart home & personal dashboard for Samsung The Frame",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${playfair.variable} ${jakarta.variable}`}>
      <body className="antialiased bg-[#F5F2EB] text-[#2C3531] font-sans select-none overflow-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
