"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveProjectButton() {
  const pathname = usePathname();
  const isOpen = !!pathname.endsWith("/opweave");

  return (
    <Link
      href="/dashboard/opweave"
      className={clsx(
        "flex items-center gap-2 px-4 py-3 transition-colors hover:bg-border/30",
        {
          "bg-primary-foreground": isOpen,
        },
      )}
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
  );
}
