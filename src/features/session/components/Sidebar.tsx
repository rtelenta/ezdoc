import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router";
import {
  HomeOutlined,
  FileTextOutlined,
  SettingOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { cx } from "@/utils/cx";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ collapsed }: SidebarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuProps["items"] = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: t("sidebar.dashboard"),
    },
    {
      key: "/templates",
      icon: <FileTextOutlined />,
      label: t("sidebar.documents"),
    },
    {
      key: "/users",
      icon: <TeamOutlined />,
      label: t("sidebar.users"),
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: t("sidebar.profile"),
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: t("sidebar.settings"),
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  return (
    <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
      <div
        className={cx(
          "flex items-center space-x-2 p-(--ant-padding-md)",
          collapsed ? "justify-center" : "justify-start"
        )}
      >
        <div className="w-8 h-8 shrink-0 bg-(--ant-color-primary) rounded-(--ant-border-radius-lg) flex items-center justify-center">
          <span className="text-white font-bold text-(length:--ant-font-size-sm)">
            EZ
          </span>
        </div>

        {!collapsed && (
          <span className="font-semibold text-(--ant-color-text)">Doc</span>
        )}
      </div>

      {/* Navigation Menu */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        className="border-r-0"
      />
    </Sider>
  );
};
