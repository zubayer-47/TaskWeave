"use client";

import ProjectProvider from "@/context/project/ProjectProvider";
import React from "react";
import DashboardWrapper from "./dashboard/DashboardWrapper";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProjectProvider>
      <DashboardWrapper>{children}</DashboardWrapper>
    </ProjectProvider>
  );
}

// // <div className="flex min-h-screen flex-col bg-dark">
//   {/* <Navbar /> */}
// //   {children}
// // </div>

export default DashboardLayout;
