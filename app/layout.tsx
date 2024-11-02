import { AuthProvider } from '@/context/auth/AuthProvider';
import React from 'react'

import type { Metadata } from "next";
import { Inter, ADLaM_Display } from "next/font/google";
import "@/styles/globals.css";

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
            <body className={`w-full h-screen antialiased ${inter.className}`}>
                <AuthProvider>
                    <main>
                        {children}
                    </main>
                </AuthProvider>
            </body>
        </html>
    )
}

export default RootLayout