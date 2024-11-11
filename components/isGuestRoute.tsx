"use client";

import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";
import LoadingSpinner from "./loader/LoadingSpinner";

const isGuestRoute = (Component: ComponentType) => {
  return function IsGuestRoute(props: Record<string, unknown>) {
    const user = false;
    const router = useRouter();

    useEffect(() => {
      if (user) {
        router.push("/dashboard");
      }
    }, [user, router]);

    if (user) {
      return <LoadingSpinner />;
    }

    return <Component {...props} />;
  };
};

export default isGuestRoute;
