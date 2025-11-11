import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({ weight: "300", subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ weight: "300", subsets: ["latin"], variable: "--font-body" });

export const metadata = { title: "noaiera", description: "the no-ai quiet room" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}