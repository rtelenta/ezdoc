import { Button, Card, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useAuth } from "react-oidc-context";

export function LoginForm() {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {t("app.welcomeTo")} {t("app.title")}
          </h1>
          <p className="text-gray-600 mb-6">{t("auth.welcomeMessage")}</p>

          <Space orientation="vertical" size="middle" className="w-full">
            <Button
              type="primary"
              size="large"
              block
              onClick={() => auth.signinRedirect()}
            >
              {t("auth.signInWithCognito")}
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
}
