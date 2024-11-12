"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import ProjectProvider from "@/context/project/ProjectProvider";
import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";

function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    console.log({ user }, "DashboardWrapper");
  }, [user]);
  return (
    <ProjectProvider>
      <div className="flex min-h-screen bg-dark">
        <Sidebar />

        <div className="flex w-full flex-col md:pl-64">
          <Navbar />

          {children}
        </div>
      </div>
    </ProjectProvider>
  );
}
// const DashboardWrapper = privateWrapperHOC(DashboardWrapperComponent);

export default DashboardWrapper;
