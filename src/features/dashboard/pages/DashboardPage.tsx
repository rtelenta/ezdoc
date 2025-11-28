import { Card, Space, Avatar, Divider, Button, Typography } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "react-oidc-context";
import { useTranslation } from "react-i18next";
import { constants } from "@/config/constants";

export function DashboardPage() {
  const auth = useAuth();
  const { t } = useTranslation();

  const signOutRedirect = async () => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {t("app.title")}
          </h1>
          <p className="text-gray-600">{t("app.description")}</p>
        </div>

        <div className="flex justify-center mb-8">
          <Card className="w-full max-w-md">
            <Space orientation="vertical" size="middle" className="w-full">
              <div className="text-center">
                <Avatar size={64} icon={<UserOutlined />} className="mb-3" />
                <Typography.Title level={4} className="mb-1">
                  {auth.user?.profile.preferred_username ||
                    auth.user?.profile.email ||
                    "User"}
                </Typography.Title>
                {auth.user?.profile.email && (
                  <Typography.Text type="secondary">
                    {auth.user.profile.email}
                  </Typography.Text>
                )}
              </div>

              <Divider />

              <div className="space-y-2 text-sm">
                {auth.user?.profile.email && (
                  <div>
                    <Typography.Text strong>{t("user.email")}:</Typography.Text>
                    <br />
                    <Typography.Text>{auth.user.profile.email}</Typography.Text>
                  </div>
                )}

                {auth.user?.profile.email_verified !== undefined && (
                  <div>
                    <Typography.Text strong>
                      {t("user.emailVerified")}:
                    </Typography.Text>
                    <br />
                    <Typography.Text>
                      {auth.user.profile.email_verified
                        ? t("user.yes")
                        : t("user.no")}
                    </Typography.Text>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Button
                  type="primary"
                  danger
                  icon={<LogoutOutlined />}
                  onClick={signOutRedirect}
                  block
                  size="large"
                >
                  {t("auth.completeSignOut")}
                </Button>
              </div>
            </Space>
          </Card>
        </div>

        {/* Main app content */}
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🎉 {t("auth.authenticationComplete")}
            </h2>
            <p className="text-gray-600 mb-4">
              {t("auth.authenticationDescription")}
            </p>
            <div className="text-sm text-gray-500">
              <p>✅ OAuth 2.0 / OIDC standard</p>
              <p>✅ AWS Cognito User Pool</p>
              <p>✅ Authorization Code Flow</p>
              <p>✅ Secure token handling</p>
            </div>

            {/* Debug info (remove in production) */}
            <Divider />
            <div className="text-left text-xs bg-gray-50 p-4 rounded">
              <Typography.Text strong>
                Debug Info (remove in production):
              </Typography.Text>
              <pre className="mt-2 text-xs overflow-auto">
                {JSON.stringify(
                  {
                    email: auth.user?.profile.email,
                    sub: auth.user?.profile.sub,
                    email_verified: auth.user?.profile.email_verified,
                    token: auth.user?.access_token,
                    refreshToken: auth.user?.refresh_token,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
