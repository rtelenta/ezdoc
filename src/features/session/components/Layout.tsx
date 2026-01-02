import { useState } from "react";
import { Layout as AntLayout } from "antd";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

const { Content } = AntLayout;

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
    <AntLayout className="h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      <AntLayout>
        <TopBar
          onSidebarToggle={handleSidebarToggle}
          isSidebarCollapsed={sidebarCollapsed}
        />
        <Content className="overflow-auto p-(--ant-padding-lg)">
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};
