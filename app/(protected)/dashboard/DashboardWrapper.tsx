import Image from "next/image";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-dark">
      <div className="flex flex-col justify-center px-2">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-2 h-full rounded-xl bg-dashboard-bg">
            <h1 className="px-4 py-3 font-adlam-display text-xl text-white">
              My Works
            </h1>
            <hr className="border-b border-border" />

            <div className="dashboard-content-height flex items-center justify-center overflow-hidden">
              <Image
                src="/welcome_dashboard.png"
                width={400}
                height={452.67}
                alt="Dashboard Feature Image"
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="col-span-10 h-full rounded-xl bg-dashboard-bg pb-2 pt-3">
            <h1 className="py-5 text-center font-adlam-display text-5xl text-primary-foreground">
              Welcome To TaskWeave Dashboard
            </h1>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
