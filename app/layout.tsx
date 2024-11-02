import { AuthProvider } from "@/context/auth/AuthProvider";
import React from "react";

import "@/styles/globals.css";
import type { Metadata } from "next";
import { ADLaM_Display, Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});
const adlam_display = ADLaM_Display({
  subsets: ["adlam"],
  weight: ["400"],
  variable: "--font-adlam-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Welcome to TaskWeave",
  description: "Manage your Projects",
  icons: {
    icon: "/taskweave-favicon.png",
  },
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`light-bg ${adlam_display.variable}`}>
      <body className={`h-screen w-full antialiased ${inter.className}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
