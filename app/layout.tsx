import React from "react";

import LoadingSpinner from "@/components/loader/LoadingSpinner";
import { constructMetadata } from "@/lib/metadata";
import "@/styles/globals.css";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import clsx from "clsx";
import { ADLaM_Display, Catamaran, Inter, Noto_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ConvexClientProvider } from "./ConvexClientProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-catamaran",
  display: "swap",
});

const notosans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const adlam_display = ADLaM_Display({
  subsets: ["adlam"],
  weight: ["400"],
  variable: "--font-adlam-display",
  display: "swap",
});

export const metadata = constructMetadata();

const publishable_key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(
        "light-bg",
        inter.variable,
        adlam_display.variable,
        catamaran.variable,
        notosans.variable,
      )}
    >
      <body className={`min-h-screen w-full antialiased ${inter.className}`}>
        <ClerkProvider publishableKey={publishable_key!} dynamic>
          <ConvexClientProvider>
            <ClerkLoading>
              <LoadingSpinner />
            </ClerkLoading>

            <ClerkLoaded>
              {/* <RouteWrapper>{children}</RouteWrapper> */}
              {children}
            </ClerkLoaded>
            <Toaster position="top-center" />
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

export default RootLayout;
