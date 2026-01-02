import { Card, Space, Avatar, Divider, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "react-oidc-context";
import { useTranslation } from "react-i18next";

export function DashboardPage() {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-(--ant-color-bg-layout)">
      <div className="container mx-auto py-(--ant-padding-lg) px-(--ant-padding-md)">
        <div className="text-center mb-(--ant-margin-lg)">
          <h1 className="text-(length:--ant-font-size-xl) font-bold text-(--ant-color-text) mb-(--ant-margin-xs)">
            {t("app.title")}
          </h1>
          <p className="text-(--ant-color-text-secondary)">
            {t("app.description")}
          </p>
        </div>

        <div className="flex justify-center mb-(--ant-margin-lg)">
          <Card className="w-full max-w-md">
            <Space orientation="vertical" size="middle" className="w-full">
              <div className="text-center">
                <Avatar
                  size={64}
                  icon={<UserOutlined />}
                  className="mb-(--ant-margin-sm)"
                />
                <Typography.Title level={4} className="mb-(--ant-margin-xs)">
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

              <div className="space-y-2 text-(length:--ant-font-size-sm)">
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
            </Space>
          </Card>
        </div>

        {/* Main app content */}
        <div className="text-center">
          <div className="bg-(--ant-color-bg-container) rounded-(--ant-border-radius-lg) shadow-md p-(--ant-padding-lg) max-w-2xl mx-auto">
            <h2 className="text-(length:--ant-font-size-lg) font-semibold text-(--ant-color-text) mb-(--ant-margin-md)">
              🎉 {t("auth.authenticationComplete")}
            </h2>
            <p className="text-(--ant-color-text-secondary) mb-(--ant-margin-md)">
              {t("auth.authenticationDescription")}
            </p>
            <div className="text-(length:--ant-font-size-sm) text-(--ant-color-text-secondary)">
              <p>✅ OAuth 2.0 / OIDC standard</p>
              <p>✅ AWS Cognito User Pool</p>
              <p>✅ Authorization Code Flow</p>
              <p>✅ Secure token handling</p>
            </div>

            {/* Debug info (remove in production) */}
            <Divider />
            <div className="text-left text-(length:--ant-font-size) bg-(--ant-color-bg-layout) p-(--ant-padding-md) rounded-(--ant-border-radius)">
              <Typography.Text strong>
                Debug Info (remove in production):
              </Typography.Text>
              <pre className="mt-(--ant-margin-xs) text-(length:--ant-font-size) overflow-auto">
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
