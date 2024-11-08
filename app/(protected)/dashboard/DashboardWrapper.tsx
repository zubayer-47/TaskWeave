import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-dark">
      <Sidebar />

      <div className="flex w-full flex-col md:pl-64">
        <Navbar />

        {children}
      </div>
    </div>
  );
}
