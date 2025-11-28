import { useAuth } from "react-oidc-context";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Avatar, Badge } from "antd";
import type { MenuProps } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { constants } from "@/config/constants";

interface TopBarProps {
  onSidebarToggle: () => void;
}

export const TopBar = ({ onSidebarToggle }: TopBarProps) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      label: (
        <div className="flex items-center space-x-2 py-1">
          <UserOutlined />
          <span>{t("topbar.profile")}</span>
        </div>
      ),
      onClick: handleProfile,
    },
    {
      key: "settings",
      label: (
        <div className="flex items-center space-x-2 py-1">
          <SettingOutlined />
          <span>{t("topbar.settings")}</span>
        </div>
      ),
      onClick: handleSettings,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <div className="flex items-center space-x-2 py-1 text-red-600">
          <LogoutOutlined />
          <span>{t("auth.signOut")}</span>
        </div>
      ),
      onClick: handleLogout,
    },
  ];

  return (
    <div className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      {/* Left side - mobile menu button and page title */}
      <div className="flex items-center space-x-4">
        {/* Mobile menu button - only visible on mobile */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={onSidebarToggle}
          className="md:hidden hover:bg-gray-100"
        />
      </div>

      {/* Right side - user actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button
          type="text"
          icon={
            <Badge count={0} size="small">
              <BellOutlined className="text-gray-600" />
            </Badge>
          }
          className="hover:bg-gray-100"
        />

        {/* User dropdown */}
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <div className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors cursor-pointer">
            <Avatar icon={<UserOutlined />} size="default" />
            <div className="hidden md:flex flex-col items-start ml-2">
              <span className="text-sm font-medium text-gray-800 leading-tight">
                {userName}
              </span>
              <span className="text-xs text-gray-500 leading-tight">
                {userEmail}
              </span>
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
