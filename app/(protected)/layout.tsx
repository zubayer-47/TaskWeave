import type { Metadata } from "next";
import { Inter, ADLaM_Display } from "next/font/google";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/auth/AuthProvider";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

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

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const { user } = useAuth()

  // useEffect(() => {
    
  // }, [user])

  return (
    <html lang="en" className={`bg-dark ${adlam_display.variable}`}>
      <body className={`h-full w-full antialiased ${inter.className}`}>
        <AuthProvider>
          <main className="flex flex-col justify-center px-5">
            <nav className='flex justify-between items-center py-2'>
              <Link href='/'>
                <Image
                  src='/task-weave-logo.webp'
                  width={150}
                  height={21.94}
                  alt='Dashboard Feature Image'
                  priority
                />
              </Link>

              <Image
                src='/zubayer.jpg'
                className='rounded-full'
                width={50}
                height={50}
                alt='Dashboard Feature Image'
                priority
              />
            </nav>

            {children}
          </main>
        </AuthProvider>

        <Toaster />
      </body>
    </html>
  );
}
