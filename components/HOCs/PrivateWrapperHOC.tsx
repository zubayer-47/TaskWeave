"use client";

import { usePathname, useRouter } from "next/navigation";
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
    const pathname = usePathname();

    useEffect(() => {
      if (!user) {
        if (pathname.startsWith("/dashboard")) {
          router.push("/login");
          return;
        }

        router.push(pathname);
      }
    }, [user, router, pathname]);

    return <Component {...props} />;
  };
};

export default privateWrapperHOC;
