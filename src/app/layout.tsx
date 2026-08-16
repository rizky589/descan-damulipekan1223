import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import MotionProvider from "@/components/MotionProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Desa Damuli Pekan - Portal Resmi Desa",
  description: "Sistem Informasi Terpadu untuk Kemajuan Desa Damuli Pekan dan Pelayanan Masyarakat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <MotionProvider>
          {children}
          <ScrollToTop />
        </MotionProvider>
      </body>
    </html>
  );
}
