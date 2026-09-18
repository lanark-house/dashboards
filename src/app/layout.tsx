import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "9:16 Vertical Kiosk Dashboard",
  description: "9:16 Vertical Dashboard Framework & Next.js Architecture for Rocky Linux bootc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-100 select-none overflow-hidden">
        {children}
      </body>
    </html>
  );
}
