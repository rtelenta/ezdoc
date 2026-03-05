import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Upload, Input, Form, message } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import { useUploadTemplate } from "../useCases/useUploadTemplate";

const { Dragger } = Upload;

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UploadTemplateModal({ open, onClose }: Props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { mutate: uploadTemplate, isPending } = useUploadTemplate();

  const handleClose = () => {
    form.resetFields();
    setFileList([]);
    onClose();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const file = fileList[0] as unknown as RcFile;
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        uploadTemplate(
          { content: base64, name: values.name },
          {
            onSuccess: () => {
              message.success(t("templates.upload.success"));
              handleClose();
            },
            onError: () => {
              message.error(t("templates.upload.error"));
            },
          },
        );
      };
      reader.readAsDataURL(file);
    } catch {
      // form validation failed
    }
  };

  const draggerProps = {
    name: "file",
    multiple: false,
    accept: ".doc,.docx",
    fileList,
    beforeUpload: (file: RcFile) => {
      const isWordDoc =
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword";
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isWordDoc) {
        message.error(t("templates.upload.invalidFormat"));
        return Upload.LIST_IGNORE;
      }
      if (!isLt10M) {
        message.error(t("templates.upload.fileTooLarge"));
        return Upload.LIST_IGNORE;
      }

      setFileList([file as unknown as UploadFile]);
      if (!form.getFieldValue("name")) {
        form.setFieldValue("name", file.name.replace(/\.(doc|docx)$/i, ""));
      }
      return false;
    },
    onRemove: () => {
      setFileList([]);
    },
  };

  return (
    <Modal
      title={t("templates.upload.title")}
      open={open}
      onCancel={handleClose}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          {t("common.cancel")}
        </Button>,
        <Button
          key="upload"
          type="primary"
          icon={<UploadOutlined />}
          loading={isPending}
          disabled={fileList.length === 0}
          onClick={handleSubmit}
        >
          {t("templates.uploadTemplate")}
        </Button>,
      ]}
      width={600}
    >
      <div className="py-(--ant-padding-md)">
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label={t("common.name")}
            rules={[
              { required: true, message: t("templates.upload.nameRequired") },
            ]}
          >
            <Input placeholder={t("templates.upload.namePlaceholder")} />
          </Form.Item>
          {fileList.length === 0 && (
            <Dragger {...draggerProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                {t("templates.upload.dragText")}{" "}
                <span className="text-(--ant-color-primary)">
                  {t("templates.upload.clickText")}
                </span>
              </p>
              <p className="ant-upload-hint">
                {t("templates.upload.supportedFormats")} •{" "}
                {t("templates.upload.maxSize")}
              </p>
            </Dragger>
          )}
          {fileList.length > 0 && (
            <Upload {...draggerProps} listType="picture">
              {null}
            </Upload>
          )}
        </Form>
      </div>
    </Modal>
  );
}
