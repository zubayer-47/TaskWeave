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
    </nav>
  );
}
