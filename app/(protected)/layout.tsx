import Image from "next/image";
import Link from "next/link";
import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    // <div className='bg-dark h-screen'>
    <div className="px-5 py-2 bg-dark h-screen">
      <nav className="flex justify-between items-center pb-1">
        <Link href="/">
          <Image
            src="/task-weave-logo.webp"
            width={150}
            height={21.94}
            alt="Dashboard Feature Image"
            priority
          />
        </Link>

        <Image
          src="/zubayer.jpg"
          className="rounded-full"
          width={50}
          height={50}
          alt="Dashboard Feature Image"
          priority
        />
      </nav>
      {children}
    </div>
    // </div>
  );
}

export default DashboardLayout;
