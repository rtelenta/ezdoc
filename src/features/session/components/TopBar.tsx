import { useAuth } from "react-oidc-context";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Layout, Button, Dropdown, Avatar, Badge, theme } from "antd";
import type { MenuProps } from "antd";
import { constants } from "@/config/constants";

const { Header } = Layout;

interface TopBarProps {
  onSidebarToggle: () => void;
  isSidebarCollapsed: boolean;
}

export const TopBar = ({
  onSidebarToggle,
  isSidebarCollapsed,
}: TopBarProps) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const user = auth.user;
  const userEmail = user?.profile?.email || "";
  const userName = user?.profile?.name || userEmail.split("@")[0] || "User";

  const handleLogout = async () => {
    const clientId = auth.settings.client_id;
    const logoutUri = auth.settings.post_logout_redirect_uri as string;
    const cognitoDomain = `https://${constants.USER_POOL_ID.replace(
      "_",
      ""
    )}.auth.${constants.AWS_REGION}.amazoncognito.com`;

    await auth.removeUser();

    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: t("topbar.profile"),
      icon: <UserOutlined />,
      onClick: handleProfile,
    },
    {
      key: "settings",
      label: t("topbar.settings"),
      icon: <SettingOutlined />,
      onClick: handleSettings,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: t("auth.signOut"),
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
      className="flex"
    >
      <Button
        type="text"
        icon={
          isSidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
        }
        onClick={onSidebarToggle}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
        className="mr-auto"
      />

      {/* Right side - user actions */}
      <div className="flex items-center space-x-4 p-4">
        {/* Notifications */}
        <Button
          type="text"
          icon={
            <Badge count={0} size="small">
              <BellOutlined className="text-(--ant-color-text-secondary)" />
            </Badge>
          }
        />

        {/* User dropdown */}
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <div className="flex items-center space-x-2 hover:bg-(--ant-color-bg-text-hover) rounded-(--ant-border-radius-lg) px-(--ant-padding-sm) py-(--ant-padding-xs) transition-colors cursor-pointer">
            <Avatar icon={<UserOutlined />} size="default" />
            <div className="hidden md:flex flex-col items-start ml-(--ant-margin-xs)">
              <span className="text-(length:--ant-font-size-sm) font-medium text-(--ant-color-text) leading-tight">
                {userName}
              </span>
              <span className="text-(length:--ant-font-size) text-(--ant-color-text-secondary) leading-tight">
                {userEmail}
              </span>
            </div>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};
