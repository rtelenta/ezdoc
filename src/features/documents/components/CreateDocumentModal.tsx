import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  Button,
  Input,
  Form,
  Select,
  message,
  Typography,
  Alert,
} from "antd";
import { PlusOutlined, CopyOutlined, LinkOutlined } from "@ant-design/icons";
import Editor from "@monaco-editor/react";
import { useCreateDocument } from "../useCases/useCreateDocument";
import { useGetTemplates } from "@/features/templates/useCases/useGetTemplates";
import type { DocumentType } from "../types/DocumentType";

const { Text, Title } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
}

const DEFAULT_JSON = JSON.stringify({ title: "My Document" }, null, 2);

export function CreateDocumentModal({ open, onClose }: Props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [jsonValue, setJsonValue] = useState(DEFAULT_JSON);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [createdDocument, setCreatedDocument] = useState<DocumentType | null>(
    null,
  );
  const { mutate: createDocument, isPending } = useCreateDocument();
  const { data: templates, isLoading: isLoadingTemplates } = useGetTemplates();

  const handleClose = () => {
    form.resetFields();
    setJsonValue(DEFAULT_JSON);
    setJsonError(null);
    setCreatedDocument(null);
    onClose();
  };

  const handleJsonChange = (value: string | undefined) => {
    setJsonValue(value ?? "");
    try {
      JSON.parse(value ?? "");
      setJsonError(null);
    } catch {
      setJsonError(t("documents.create.invalidJson"));
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (jsonError) return;

      let parsedData: Record<string, unknown>;
      try {
        parsedData = JSON.parse(jsonValue);
      } catch {
        setJsonError(t("documents.create.invalidJson"));
        return;
      }

      createDocument(
        {
          template_id: values.template_id,
          description: values.description,
          data: parsedData,
        },
        {
          onSuccess: (doc) => {
            message.success(t("documents.create.success"));
            setCreatedDocument(doc);
          },
          onError: () => {
            message.error(t("documents.create.error"));
          },
        },
      );
    } catch {
      // form validation failed
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success(t("documents.create.copied"));
  };

  return (
    <Modal
      title={t("documents.create.title")}
      open={open}
      onCancel={handleClose}
      footer={
        createdDocument
          ? [
              <Button key="close" onClick={handleClose}>
                {t("common.close")}
              </Button>,
            ]
          : [
              <Button key="cancel" onClick={handleClose}>
                {t("common.cancel")}
              </Button>,
              <Button
                key="create"
                type="primary"
                icon={<PlusOutlined />}
                loading={isPending}
                onClick={handleSubmit}
              >
                {t("documents.create.submit")}
              </Button>,
            ]
      }
      width={700}
    >
      <div className="py-(--ant-padding-md) flex flex-col gap-(--ant-margin-md)">
        {!createdDocument ? (
          <Form form={form} layout="vertical">
            <Form.Item
              name="template_id"
              label={t("documents.create.template")}
              rules={[
                {
                  required: true,
                  message: t("documents.create.templateRequired"),
                },
              ]}
            >
              <Select
                placeholder={t("documents.create.templatePlaceholder")}
                loading={isLoadingTemplates}
                options={templates?.map((tpl) => ({
                  value: tpl.id,
                  label: tpl.name,
                }))}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item
              name="description"
              label={t("documents.create.description")}
              rules={[
                {
                  required: true,
                  message: t("documents.create.descriptionRequired"),
                },
              ]}
            >
              <Input
                placeholder={t("documents.create.descriptionPlaceholder")}
              />
            </Form.Item>

            <Form.Item
              label={t("documents.create.data")}
              validateStatus={jsonError ? "error" : ""}
              help={jsonError}
            >
              <div className="border border-(--ant-color-border) rounded-(--ant-border-radius) overflow-hidden">
                <Editor
                  height="220px"
                  defaultLanguage="json"
                  value={jsonValue}
                  onChange={handleJsonChange}
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 13,
                    tabSize: 2,
                    lineNumbers: "off",
                    folding: false,
                  }}
                />
              </div>
            </Form.Item>
          </Form>
        ) : (
          <div className="flex flex-col gap-(--ant-margin-md)">
            <Alert
              type="success"
              showIcon
              message={t("documents.create.success")}
            />

            <div className="p-(--ant-padding-md) bg-(--ant-color-bg-layout) rounded-(--ant-border-radius) flex flex-col gap-(--ant-margin-sm)">
              <div>
                <Text
                  type="secondary"
                  className="text-(length:--ant-font-size-sm)"
                >
                  ID
                </Text>
                <div className="font-mono text-(length:--ant-font-size-sm)">
                  {createdDocument.id}
                </div>
              </div>

              <div>
                <Text
                  type="secondary"
                  className="text-(length:--ant-font-size-sm)"
                >
                  {t("documents.create.description")}
                </Text>
                <div>{createdDocument.description}</div>
              </div>

              <div>
                <Text
                  type="secondary"
                  className="text-(length:--ant-font-size-sm)"
                >
                  {t("documents.table.createdDate")}
                </Text>
                <div>
                  {new Date(createdDocument.created_at).toLocaleString("es")}
                </div>
              </div>
            </div>

            <div>
              <Title level={5} className="mb-(--ant-margin-xs)">
                {t("documents.create.viewUrl")}
              </Title>
              <div className="flex items-center gap-(--ant-margin-xs) p-(--ant-padding-sm) bg-(--ant-color-bg-layout) rounded-(--ant-border-radius) border border-(--ant-color-border)">
                <LinkOutlined className="text-(--ant-color-primary) shrink-0" />
                <Text
                  className="flex-1 break-all text-(length:--ant-font-size-sm) font-mono"
                  copyable={false}
                >
                  <a
                    href={createdDocument.view_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--ant-color-primary) underline break-all"
                  >
                    {createdDocument.view_url}
                  </a>
                </Text>
                <Button
                  type="text"
                  size="small"
                  icon={<CopyOutlined />}
                  onClick={() => copyToClipboard(createdDocument.view_url)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
