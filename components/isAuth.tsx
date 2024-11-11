"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAppSelector } from "@/lib/hooks";
import LoadingSpinner from "./loader/LoadingSpinner";

type DefaultProps = {
  children: React.ReactNode;
};

const isAuth = <P extends DefaultProps>(Component: React.ComponentType<P>) => {
  return function IsAuth(props: P) {
    const user = useAppSelector((state) => state.auth.user);
    const router = useRouter();

    console.log({ user });

    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

    if (!user) {
      return <LoadingSpinner />;
    }

    return <Component {...props} />;
  };
};

export default isAuth;
