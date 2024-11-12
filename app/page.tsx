"use client";

import Image from "next/image";
import Link from "next/link";

function Home() {
  return (
    <div className="flex h-screen select-none flex-col items-center justify-center gap-7">
      <div className="space-y-2 text-center">
        <h1 className="title">Welcome to TaskWeave</h1>

        <span className="font-adlam-display text-xl">
          {" "}
          Manage All of Your Projects Here{" "}
        </span>
      </div>

      <Link
        href="/login"
        className="mb-5 rounded-lg bg-primary-foreground px-5 py-3 font-adlam-display text-xl text-gray-50 transition-colors hover:bg-primary-foreground/70"
      >
        Get Started
      </Link>

      <div className="flex items-center">
        <div className="relative h-[22.1875rem] w-[31.25rem] rounded-2xl">
          <Image
            src="/Dashboard.png"
            width={500}
            height={355}
            className="rounded-2xl shadow-2xl"
            alt="Dashboard Feature Image"
            priority
          />
          <div className="absolute inset-0 size-full rounded-2xl bg-gray-900/40"></div>
        </div>
        <div className="relative -ml-56 mb-14 h-[22.1875rem] w-[31.25rem] rounded-2xl">
          <Image
            src="/Dashboard.png"
            width={500}
            height={355}
            className="rounded-2xl shadow-2xl"
            alt="Dashboard Feature Image"
            priority
          />
          <div className="absolute inset-0 size-full rounded-2xl bg-gray-900/40"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
