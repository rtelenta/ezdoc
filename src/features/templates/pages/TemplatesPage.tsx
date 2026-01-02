import { useState } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Table,
  Button,
  Input,
  Card,
  Dropdown,
  Modal,
  Upload,
  Empty,
  Space,
  Row,
  Col,
  Statistic,
  Typography,
  Alert,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  CopyOutlined,
  UploadOutlined,
  InboxOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { MenuProps } from "antd";
import { useGetTemplates } from "../useCases/useGetTemplates";
import type { TemplateType } from "../types/TemplateType";

const { Title, Text } = Typography;
const { Search } = Input;
const { Dragger } = Upload;

export function TemplatesPage() {
  const { t } = useTranslation();
  const { data: templates, isLoading, error } = useGetTemplates();
  const [searchText, setSearchText] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(
    null
  );

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy, HH:mm", { locale: es });
  };

  const handleDelete = (template: TemplateType) => {
    setSelectedTemplate(template);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log("Deleting template:", selectedTemplate);
    setDeleteModalVisible(false);
    setSelectedTemplate(null);
  };

  const handleAction = (key: string, template: TemplateType) => {
    switch (key) {
      case "view":
        console.log("Viewing template:", template);
        break;
      case "download":
        console.log("Downloading template:", template);
        break;
      case "edit":
        console.log("Editing template:", template);
        break;
      case "duplicate":
        console.log("Duplicating template:", template);
        break;
      default:
        break;
    }
  };

  const getActionMenuItems = (template: TemplateType): MenuProps["items"] => [
    {
      key: "view",
      label: (
        <Space>
          <EyeOutlined />
          {t("templates.actions.view")}
        </Space>
      ),
      onClick: () => handleAction("view", template),
    },
    {
      key: "download",
      label: (
        <Space>
          <DownloadOutlined />
          {t("templates.actions.download")}
        </Space>
      ),
      onClick: () => handleAction("download", template),
    },
    {
      key: "edit",
      label: (
        <Space>
          <EditOutlined />
          {t("templates.actions.edit")}
        </Space>
      ),
      onClick: () => handleAction("edit", template),
    },
    {
      key: "duplicate",
      label: (
        <Space>
          <CopyOutlined />
          {t("templates.actions.duplicate")}
        </Space>
      ),
      onClick: () => handleAction("duplicate", template),
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: (
        <Space className="text-(--ant-color-error)">
          <DeleteOutlined />
          {t("templates.actions.delete")}
        </Space>
      ),
      onClick: () => handleDelete(template),
    },
  ];

  const columns: ColumnsType<TemplateType> = [
    {
      title: t("templates.table.name"),
      dataIndex: "name",
      key: "name",
      render: (name: string, record: TemplateType) => (
        <div>
          <div className="font-medium text-(--ant-color-text)">{name}</div>
          <div className="text-(length:--ant-font-size-sm) text-(--ant-color-text-secondary)">
            {record.id}
          </div>
        </div>
      ),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toString().toLowerCase()) ||
        record.id.toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      title: t("templates.table.createdBy"),
      dataIndex: "created_by",
      key: "created_by",
      render: (created_by: TemplateType["created_by"]) => (
        <div>
          <div className="text-(length:--ant-font-size-sm) text-(--ant-color-text)">
            {created_by.email}
          </div>
        </div>
      ),
    },
    {
      title: t("templates.table.createdDate"),
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => formatDate(date),
      sorter: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      defaultSortOrder: "descend",
    },
    {
      title: t("templates.table.actions"),
      key: "actions",
      width: 120,
      render: (_, record: TemplateType) => (
        <Dropdown
          menu={{ items: getActionMenuItems(record) }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const tableProps: TableProps<TemplateType> = {
    columns,
    dataSource: templates || [],
    rowKey: "id",
    loading: isLoading,
    pagination: {
      pageSize: 10,
      showTotal: (total, range) =>
        `${range[0]}-${range[1]} de ${total} plantillas`,
    },
    locale: {
      emptyText: (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div>
              <div className="text-(--ant-color-text-secondary) mb-(--ant-margin-xs)">
                {t("templates.noTemplates")}
              </div>
              <Text
                type="secondary"
                className="text-(length:--ant-font-size-sm)"
              >
                {t("templates.noTemplatesDescription")}
              </Text>
            </div>
          }
        />
      ),
    },
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    accept: ".doc,.docx",
    beforeUpload: (file: File) => {
      const isWordDoc =
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword";
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isWordDoc) {
        console.error("Solo se permiten archivos de Word (.doc, .docx)");
        return false;
      }
      if (!isLt10M) {
        console.error("El archivo debe ser menor a 10MB");
        return false;
      }
      return false; // Prevent automatic upload for now
    },
    onDrop(e: React.DragEvent<HTMLDivElement>) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <Title level={2} className="mb-(--ant-margin-xs)">
          {t("templates.title")}
        </Title>
        <Text type="secondary" className="text-(length:--ant-font-size-lg)">
          {t("templates.description")}
        </Text>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert
          message={t("templates.error")}
          description={error.message}
          type="error"
          showIcon
          closable
        />
      )}

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total de Plantillas"
              value={templates?.length || 0}
              loading={isLoading}
              styles={{ content: { color: "#1890ff" } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Subidas Este Mes"
              value={2}
              styles={{ content: { color: "#3f8600" } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Más Utilizadas"
              value={5}
              styles={{ content: { color: "#722ed1" } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tamaño Total"
              value="2.1 MB"
              styles={{ content: { color: "#eb2f96" } }}
            />
          </Card>
        </Col>
      </Row>

      {/* Actions and Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
            <Search
              placeholder={t("templates.searchPlaceholder")}
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              className="w-full sm:w-80"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setUploadModalVisible(true)}
          >
            {t("templates.uploadTemplate")}
          </Button>
        </div>
      </Card>

      {/* Templates Table */}
      <Card>
        <Table {...tableProps} />
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        title={t("templates.deleteConfirm.title")}
        open={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteModalVisible(false)}>
            {t("templates.deleteConfirm.cancel")}
          </Button>,
          <Button key="delete" type="primary" danger onClick={confirmDelete}>
            {t("templates.deleteConfirm.confirm")}
          </Button>,
        ]}
      >
        <p>{t("templates.deleteConfirm.description")}</p>
        {selectedTemplate && (
          <div className="mt-(--ant-margin-md) p-(--ant-padding-sm) bg-(--ant-color-bg-layout) rounded-(--ant-border-radius)">
            <Text strong>{selectedTemplate.id}</Text>
          </div>
        )}
      </Modal>

      {/* Upload Template Modal */}
      <Modal
        title={t("templates.upload.title")}
        open={uploadModalVisible}
        onCancel={() => setUploadModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setUploadModalVisible(false)}>
            {t("common.cancel")}
          </Button>,
          <Button key="upload" type="primary" icon={<UploadOutlined />}>
            {t("templates.uploadTemplate")}
          </Button>,
        ]}
        width={600}
      >
        <div className="py-(--ant-padding-md)">
          <Dragger {...uploadProps} className="mb-(--ant-margin-md)">
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
        </div>
      </Modal>
    </div>
  );
}
