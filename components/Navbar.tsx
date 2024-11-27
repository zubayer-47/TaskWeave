"use client";

import { useUser } from "@clerk/clerk-react";
import { Bolt, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function Navbar() {
  const user = useUser();

  return (
    <nav className="dropdown flex h-16 items-center justify-end border-b border-border bg-dashboard-bg px-4 py-2">
      <button type="button" data-dropdown-btn>
        <Image
          src={user.user?.imageUrl || "/zubayer.jpg"}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
          alt="Dashboard Feature Image"
          priority
        />
      </button>

      <div className="dropdown-menu">
        <Link href={"/dashboard/profile"} className="dropdown-link">
          <UserRound />
          <span>Profile</span>
        </Link>

        <Link href={"/dashboard/settings"} className="dropdown-link">
          <Bolt />
          <span>Settings</span>
        </Link>
        <SignOutButton />
      </div>

      {/* <div
        className={clsx(
          "absolute right-3 top-16 z-10 w-56 origin-top-right rounded-md bg-slate-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
          {
            "animate-in opacity-100": menu,
            "hidden animate-out opacity-0": !menu,
          },
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div className="py-1" role="none">
          <Link
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-0"
          >
            Account settings
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-1"
          >
            Support
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-2"
          >
            License
          </Link>
          <form method="POST" action="#" role="none">
            <SignOutButton />
          </form>
        </div>
      </div> */}
      {/* </div> */}
    </nav>
  );
}
