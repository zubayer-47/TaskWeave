"use client";
import { useClerk } from "@clerk/clerk-react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const { signOut } = useClerk();
  // const router = useRouter();
  const handleSignOut = () => {
    signOut({ redirectUrl: "/" });

    // router.refresh();
  };

  return (
    <button
      type="button"
      // tabIndex={-1}
      onClick={handleSignOut}
      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-800 transition-colors hover:bg-slate-300"
    >
      <LogOut />
      <span>Sign Out</span>
    </button>
  );
}
