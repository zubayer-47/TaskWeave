import React from "react";
import DashboardWrapper from "./dashboard/DashboardWrapper";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}

// // <div className="flex min-h-screen flex-col bg-dark">
//   {/* <Navbar /> */}
// //   {children}
// // </div>

export default DashboardLayout;
