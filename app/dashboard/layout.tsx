export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section id="dashboard" className="bg-dark">
      {children}
    </section>
  );
}
