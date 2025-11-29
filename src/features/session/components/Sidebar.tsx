import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router";
import {
  HomeOutlined,
  FileTextOutlined,
  SettingOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { cx } from "@/utils/cx";

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      key: "dashboard",
      icon: <HomeOutlined />,
      label: t("sidebar.dashboard"),
      path: "/",
    },
    {
      key: "documents",
      icon: <FileTextOutlined />,
      label: t("sidebar.documents"),
      path: "/templates",
    },
    {
      key: "users",
      icon: <TeamOutlined />,
      label: t("sidebar.users"),
      path: "/users",
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: t("sidebar.profile"),
      path: "/profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: t("sidebar.settings"),
      path: "/settings",
    },
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const renderMenuItem = (item: MenuItem) => {
    const isActive = location.pathname === item.path;
    const menuButton = (
      <Button
        type={isActive ? "primary" : "text"}
        icon={item.icon}
        onClick={() => handleMenuClick(item.path)}
        className={cx(
          "w-full h-12 flex items-center shadow-none!",
          collapsed ? "px-3" : "px-4 !justify-start rounded-none!",
          isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"
        )}
      >
        {!collapsed && (
          <span className="ml-3 text-sm font-medium">{item.label}</span>
        )}
      </Button>
    );

    if (collapsed) {
      return (
        <Tooltip key={item.key} title={item.label} placement="right">
          {menuButton}
        </Tooltip>
      );
    }

    return <div key={item.key}>{menuButton}</div>;
  };

  return (
    <>
      {/* Mobile backdrop */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={cx(
          "bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 ease-in-out",
          // Desktop behavior - relative positioning
          "md:relative md:h-full md:translate-x-0",
          // Mobile behavior - fixed positioned overlay
          "fixed top-0 left-0 z-50",
          // Width - always maintain width, control visibility with translate
          collapsed ? "w-16 md:w-16" : "w-64",
          // Mobile translation: hide completely when collapsed, show when expanded
          // Desktop: always visible (md:translate-x-0 overrides)
          collapsed ? "-translate-x-full" : "translate-x-0"
        )}
      >
        {/* Header with toggle button */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EZ</span>
            </div>
            {!collapsed && (
              <span className="font-semibold text-gray-800">Doc</span>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav
          className={cx(
            "flex flex-col flex-1 py-4 space-y-1",
            collapsed && "items-center"
          )}
        >
          {menuItems.map(renderMenuItem)}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          {!collapsed && (
            <div className="text-xs text-gray-500 text-center">
              © 2025 EzDoc
            </div>
          )}
        </div>
      </div>
    </>
  );
};
