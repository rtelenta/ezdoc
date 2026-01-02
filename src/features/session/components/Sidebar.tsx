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
          collapsed
            ? "px-(--ant-padding-sm)"
            : "px-(--ant-padding-md) justify-start! rounded-none!",
          isActive
            ? "bg-(--ant-color-primary) text-white"
            : "hover:bg-(--ant-color-bg-text-hover)"
        )}
      >
        {!collapsed && (
          <span className="ml-(--ant-margin-sm) text-(length:--ant-font-size-sm) font-medium">
            {item.label}
          </span>
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
          "bg-(--ant-color-bg-container) border-r border-(--ant-color-border) h-screen flex flex-col transition-all duration-300 ease-in-out",
          "md:relative md:h-full md:translate-x-0",
          "fixed top-0 left-0 z-50",
          collapsed ? "w-16 md:w-16" : "w-64",
          collapsed ? "-translate-x-full" : "translate-x-0"
        )}
      >
        {/* Header with toggle button */}
        <div className="h-16 border-b border-(--ant-color-border) flex items-center justify-between px-(--ant-padding-md)">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-(--ant-color-primary) rounded-(--ant-border-radius-lg) flex items-center justify-center">
              <span className="text-white font-bold text-(length:--ant-font-size-sm)">
                EZ
              </span>
            </div>
            {!collapsed && (
              <span className="font-semibold text-(--ant-color-text)">Doc</span>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav
          className={cx(
            "flex flex-col flex-1 py-(--ant-padding-md) space-y-1",
            collapsed && "items-center"
          )}
        >
          {menuItems.map(renderMenuItem)}
        </nav>

        {/* Footer */}
        <div className="border-t border-(--ant-color-border) p-(--ant-padding-md)">
          {!collapsed && (
            <div className="text-(length:--ant-font-size) text-(--ant-color-text-secondary) text-center">
              © 2025 EzDoc
            </div>
          )}
        </div>
      </div>
    </>
  );
};
