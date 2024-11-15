import React from "react";

import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { ADLaM_Display, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import PublicRouteWrapper from "./PublicRouteWrapper";
import StoreProvider from "./StoreProvider";

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
      <body className={`min-h-screen w-full antialiased ${inter.className}`}>
        <ClerkProvider>
          <StoreProvider>
            <PublicRouteWrapper>
              {children}

              <Toaster position="top-center" />
            </PublicRouteWrapper>
          </StoreProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

export default RootLayout;
