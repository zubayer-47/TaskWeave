"use client";

import CreateProject from "@/components/CreateProject";
import Image from "next/image";
import Link from "next/link";

function Dashboard() {
  return (
    <div className="flex flex-col justify-center px-2">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-2 h-full rounded-xl bg-dashboard-bg">
          <h1 className="px-4 py-3 font-adlam-display text-xl text-white">
            My Works
          </h1>
          <hr className="border-b border-border" />

          <CreateProject />

          <Link
            href="/dashboard/opweave"
            className="flex items-center gap-2 px-4 py-3 transition-colors hover:bg-border/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-border"
            >
              <polyline points="15 10 20 15 15 20" />
              <path d="M4 4v7a4 4 0 0 0 4 4h12" />
            </svg>

            <h2 className="font-inter font-semibold text-white">OpWeave</h2>
          </Link>
        </div>
        <div className="col-span-10 h-full rounded-xl bg-dashboard-bg pb-2 pt-3">
          <h1 className="py-5 text-center font-adlam-display text-5xl text-primary-foreground">
            Welcome To TaskWeave Dashboard
          </h1>
          <div className="dashboard-content-height flex items-center justify-center overflow-hidden">
            <Image
              src="/welcome_dashboard.png"
              width={400}
              height={452.67}
              alt="Dashboard Feature Image"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
