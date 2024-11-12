"use client";

import { useProfileQuery } from "@/lib/auth/authApi";

export default function Profile() {
  useProfileQuery();

  return <div>Profile</div>;
}
