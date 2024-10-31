"use client";

import CreateProject from "@/components/CreateProject";
import ProjectProvider from "@/context/project/ProjectProvider";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProjectContent from "./components/ProjectContent";

function Project() {
  const pathname = usePathname();
  // const { user } = useAuth()

  const isOpen = !!pathname.endsWith("/opweave");

  // useEffect(() => {
  // 	console.log('mounted', user)

  // 	return () => {
  // 		console.log('unmounted', user)
  // 	}
  // }, [user])

  return (
    <ProjectProvider>
      <div className="flex flex-col justify-center gap-3 px-4">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-2 h-full rounded-3xl bg-dashboard-bg">
            <h1 className="px-4 py-3 font-adlam-display text-xl text-white">
              My Works
            </h1>
            <hr className="border-b border-border" />

            <CreateProject />
            <Link
              href="/dashboard/opweave"
              className={clsx(
                "mx-2 flex items-center gap-2 px-2 py-3 transition-colors hover:bg-border/30",
                {
                  "rounded-md bg-primary-foreground/90": isOpen,
                },
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-border"
              >
                <polyline points="15 10 20 15 15 20" />
                <path d="M4 4v7a4 4 0 0 0 4 4h12" />
              </svg>

              <h2 className="font-inter font-semibold text-white">OpWeave</h2>
            </Link>
          </div>
          <ProjectContent />
        </div>
      </div>
    </ProjectProvider>
  );
}

export default Project;
