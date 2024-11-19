"use client";
import { useClerk } from "@clerk/clerk-react";

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
      className="block w-full px-4 py-2 text-left text-sm text-gray-700"
    >
      Sign Out
    </button>
  );
}
