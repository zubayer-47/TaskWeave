"use client";

import taskWeaveLogo from "@/public/task-weave-logo.webp";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menu, setMenu] = useState(false);

  const handleUserMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <nav className="mb-2 flex items-center justify-between bg-dashboard-bg px-4">
      <Link href="/">
        <Image
          className="h-fit w-28"
          src={taskWeaveLogo}
          // width={150}
          // height={21.94}
          alt="Dashboard Feature Image"
          priority
        />
      </Link>

      <div className="relative">
        <button type="button" onClick={handleUserMenu}>
          <Image
            src="/zubayer.jpg"
            className="rounded-full"
            width={50}
            height={50}
            alt="Dashboard Feature Image"
            priority
          />
        </button>

        <div
          className={clsx(
            "absolute right-0 z-10 w-56 origin-top-right rounded-md bg-slate-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
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
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-3"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
