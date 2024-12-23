import taskWeaveLogo from "@/public/task-weave-logo.png";
import Image from "next/image";
import Link from "next/link";
import CreateProject from "../CreateProject";
import ActiveProjectButton from "./ActiveProjectButton";

export default function Sidebar() {
  return (
    <aside className="fixed z-30 flex h-full w-64 flex-col gap-2 overflow-y-auto bg-dashboard-bg transition-all duration-300">
      <Link
        href="/"
        className="flex h-16 w-full items-center border-b border-border"
      >
        <Image
          className="w-56 px-2 py-2"
          src={taskWeaveLogo}
          alt="Dashboard Feature Image"
          priority
        />
        <sup className="text-muted font-noto-sans text-xs tracking-wide text-emerald-500">
          Beta
        </sup>
      </Link>

      <div>
        <Link
          href="/dashboard/profile"
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

          <h2 className="font-inter font-semibold text-white">Profile</h2>
        </Link>

        <Link
          href="/dashboard/settings"
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

          <h2 className="font-inter font-semibold text-white">Settings</h2>
        </Link>
      </div>

      <div>
        <h1 className="px-4 py-3 font-adlam-display text-xl text-white">
          My Works
        </h1>
        <hr className="border-b border-border" />

        <CreateProject />

        <ActiveProjectButton />
      </div>
    </aside>
  );
}
