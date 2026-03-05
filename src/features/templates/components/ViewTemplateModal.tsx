import { useEffect } from "react";
import { Modal, Button, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useGetViewUrl } from "../useCases/useGetViewUrl";
import type { TemplateType } from "../types/TemplateType";

interface ViewTemplateModalProps {
  open: boolean;
  template: TemplateType | null;
  onClose: () => void;
}

export function ViewTemplateModal({
  open,
  template,
  onClose,
}: ViewTemplateModalProps) {
  const { t } = useTranslation();
  const {
    mutate: generateViewUrl,
    isPending: isGeneratingToken,
    data: viewData,
    reset,
  } = useGetViewUrl();

  useEffect(() => {
    if (open && template) {
      generateViewUrl(template.id, {
        onError: (error) => {
          console.error("Error generating view token:", error);
        },
      });
    }
  }, [open, template, generateViewUrl]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      title={template?.name || t("templates.viewTemplate")}
      open={open}
      onCancel={handleClose}
      footer={[
        <Button key="close" onClick={handleClose}>
          {t("common.close")}
        </Button>,
      ]}
      width="90%"
      style={{ top: 20 }}
      styles={{ body: { height: "calc(100vh - 200px)" } }}
    >
      {isGeneratingToken ? (
        <div className="flex items-center justify-center h-full">
          <Space direction="vertical" align="center">
            <div className="text-(--ant-color-text-secondary)">
              {t("templates.generatingView")}
            </div>
          </Space>
        </div>
      ) : viewData?.view_url && template ? (
        <iframe
          src={viewData.view_url}
          className="w-full h-full border-0"
          title={template.name}
        />
      ) : null}
    </Modal>
  );
}
