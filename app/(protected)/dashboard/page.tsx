"use client";

import Image from "next/image";

function Dashboard() {
  return (
    <div className="h-full bg-dark pb-2 pt-3">
      <h1 className="py-5 text-center font-adlam-display text-5xl text-primary-foreground">
        Welcome To TaskWeave Dashboard
      </h1>
      <div className="flex items-center justify-center overflow-hidden">
        <Image
          src="/welcome_dashboard.png"
          width={400}
          height={452.67}
          alt="Dashboard Feature Image"
          priority
        />
      </div>
    </div>
  );
}

export default Dashboard;
