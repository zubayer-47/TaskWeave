import React from "react";
import DashboardWrapper from "./dashboard/DashboardWrapper";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardWrapper>
      <main>{children}</main>
    </DashboardWrapper>
  );
}

export default DashboardLayout;
