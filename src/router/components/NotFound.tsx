import { Result, Button, Space, Typography } from "antd";
import {
  HomeOutlined,
  ReloadOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

export function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const goHome = () => {
    navigate("/");
  };

  const goBack = () => {
    navigate(-1);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <Result
            icon={
              <div className="relative">
                <FileSearchOutlined className="text-8xl text-blue-400 animate-pulse" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
              </div>
            }
            title={
              <div className="space-y-2">
                <Title
                  level={1}
                  className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  404
                </Title>
                <Title level={2} className="text-gray-800 mb-0">
                  {t("notFound.title")}
                </Title>
              </div>
            }
            subTitle={
              <div className="space-y-4">
                <Paragraph className="text-gray-600 text-lg max-w-md mx-auto">
                  {t("notFound.description")}
                </Paragraph>
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <Paragraph className="text-gray-700 mb-0 text-sm">
                    <strong>{t("notFound.possibleCauses")}</strong>
                    <br />• {t("notFound.wrongUrl")}
                    <br />• {t("notFound.deletedPage")}
                    <br />• {t("notFound.outdatedLink")}
                  </Paragraph>
                </div>
              </div>
            }
          />

          {/* Action Buttons */}
          <div className="mt-8">
            <Space size="large" wrap className="justify-center">
              <Button
                type="primary"
                size="large"
                icon={<HomeOutlined />}
                onClick={goHome}
                className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 px-8 py-2 h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {t("notFound.goHome")}
              </Button>

              <Button
                size="large"
                icon={<ReloadOutlined />}
                onClick={refreshPage}
                className="px-8 py-2 h-12 text-base font-medium hover:border-blue-400 hover:text-blue-600 transition-all duration-200"
              >
                {t("notFound.reload")}
              </Button>

              <Button
                size="large"
                onClick={goBack}
                className="px-8 py-2 h-12 text-base font-medium hover:border-gray-400 transition-all duration-200"
              >
                {t("notFound.goBack")}
              </Button>
            </Space>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-center space-x-4 text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">{t("notFound.systemStatus")}</span>
            </div>
          </div>
          <Paragraph className="text-gray-500 text-sm mt-3 mb-0">
            {t("notFound.supportMessage")}
          </Paragraph>
        </div>
      </div>
    </div>
  );
}
