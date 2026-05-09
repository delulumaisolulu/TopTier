import { Navbar } from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      
      {/* We will implement Phase 5 Sidebar here later */}
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full">
        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}