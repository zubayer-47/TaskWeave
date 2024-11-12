import React from "react";
import DashboardWrapper from "./dashboard/DashboardWrapper";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}

export default DashboardLayout;
