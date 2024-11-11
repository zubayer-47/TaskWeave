"use client";

import isAuth from "@/components/isAuth";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import ProjectProvider from "@/context/project/ProjectProvider";

function DashboardWrapperComponent({
  children,
}: {
  children: React.ReactNode;
}) {
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
const DashboardWrapper = isAuth(DashboardWrapperComponent);

export default DashboardWrapper;
