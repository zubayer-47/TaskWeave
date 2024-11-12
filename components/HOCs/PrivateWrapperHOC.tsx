"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAppSelector } from "@/lib/hooks";

type DefaultProps = {
  children: React.ReactNode;
};

const privateWrapperHOC = <P extends DefaultProps>(
  Component: React.ComponentType<P>,
) => {
  return function PrivateWrapperHOCComponent(props: P) {
    const user = useAppSelector((state) => state.auth.user);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

    return <Component {...props} />;
  };
};

export default privateWrapperHOC;
