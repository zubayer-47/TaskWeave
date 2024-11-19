"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useUser } from "@clerk/clerk-react";

type DefaultProps = {
  children: React.ReactNode;
};

const privateWrapperHOC = <P extends DefaultProps>(
  Component: React.ComponentType<P>,
) => {
  return function PrivateWrapperHOCComponent(props: P) {
    const { user } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!user) {
        if (pathname.startsWith("/dashboard")) {
          router.push("/login");
          return;
        }

        // router.push(pathname);
      }
    }, [user, router, pathname]);

    return <Component {...props} />;
  };
};

export const RouteWrapper = function ({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log(user, pathname, "RouteWrapper");
    if (!user) {
      if (pathname.startsWith("/dashboard")) {
        router.push("/login");
        return;
      }

      // router.push(pathname);
    } else {
      if (["/login", "/register", "/"].includes(pathname)) {
        router.push("/dashboard");
        return;
      }

      console.log("i am firing");

      router.push(pathname);
    }
  }, [user, router, pathname]);

  return children;
};

export default privateWrapperHOC;
