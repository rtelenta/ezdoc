import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  // Initialize sidebar state - start collapsed on mobile, expanded on desktop
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768; // Start collapsed on mobile
    }
    return false; // Default to expanded for SSR
  });

  const handleSidebarToggle = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="h-screen flex bg-gray-50 relative">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <TopBar onSidebarToggle={handleSidebarToggle} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
