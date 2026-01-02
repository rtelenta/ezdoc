import { Button, Card, Flex, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useAuth } from "react-oidc-context";

export function LoginForm() {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Flex className="flex items-center justify-center min-h-screen bg-(--ant-color-bg-layout)">
      <Card className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-(length:--ant-font-size-xl) font-bold text-(--ant-color-text) mb-(--ant-margin-lg)">
            {t("app.welcomeTo")} {t("app.title")}
          </h1>
          <p className="text-(--ant-color-text-secondary) mb-(--ant-margin-lg)">
            {t("auth.welcomeMessage")}
          </p>

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
    </Flex>
  );
}
