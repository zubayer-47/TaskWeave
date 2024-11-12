"use client";

import privateWrapperHOC from "@/components/HOCs/PrivateWrapperHOC";
import { useAppSelector } from "@/lib/hooks";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function PublicRouteWrapperComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      if (["/login", "/register", "/"].includes(pathname)) {
        router.push("/dashboard");
        return;
      }

      router.push(pathname);
      return;
    }
  }, [user, router, pathname]);

  return children;
}

const PublicRouteWrapper = privateWrapperHOC(PublicRouteWrapperComponent);

export default PublicRouteWrapper;
