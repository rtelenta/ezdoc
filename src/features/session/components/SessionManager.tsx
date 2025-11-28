import { useAuth } from "react-oidc-context";
import { useEffect } from "react";
import { Button, Card, Space } from "antd";
import { useTranslation } from "react-i18next";
import { PageLoader } from "@/components/PageLoader";

export function SessionManager({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (auth.isAuthenticated) {
      const url = new URL(window.location.href);
      if (url.searchParams.has("code")) {
        url.searchParams.delete("code");
        url.searchParams.delete("state");
        window.history.replaceState({}, document.title, url.toString());
      }
    }
  }, [auth.isAuthenticated]);

  if (auth.isLoading) {
    return <PageLoader />;
  }

  if (auth.error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              {t("auth.authenticationError")}
            </h2>
            <p className="text-gray-600 mb-4">{auth.error.message}</p>
            <Button onClick={() => window.location.reload()}>
              {t("auth.retry")}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (auth.isAuthenticated) {
    return children;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Bienvenido a {t("app.title")}
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
