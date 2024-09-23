import type { Metadata } from "next";
import { Inter, ADLaM_Display } from "next/font/google";
import "@/styles/globals.css";
import { getAuth } from 'firebase/auth'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const auth = 

  return (
    <html lang="en" className={`${adlam_display.variable}`}>
      <body
        className={`h-screen w-full light-bg antialiased ${inter.className}`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
