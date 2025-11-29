import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  Button,
  Input,
  Card,
  Tag,
  Dropdown,
  Modal,
  Upload,
  Empty,
  Space,
  Row,
  Col,
  Statistic,
  Typography,
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

const { Title, Text } = Typography;
const { Search } = Input;
const { Dragger } = Upload;

interface Template {
  id: string;
  name: string;
  author: string;
  createdDate: string;
  updatedDate: string;
  version: string;
  size: string;
  fileType: string;
}

export function TemplatesPage() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );

  // Mock data - replace with actual API call
  const mockTemplates: Template[] = [
    {
      id: "1",
      name: "Contrato de Trabajo Estándar",
      author: "María González",
      createdDate: "2024-11-01",
      updatedDate: "2024-11-25",
      version: "2.1",
      size: "245 KB",
      fileType: "docx",
    },
    {
      id: "2",
      name: "Propuesta Comercial",
      author: "Carlos Rodríguez",
      createdDate: "2024-10-15",
      updatedDate: "2024-11-20",
      version: "1.5",
      size: "180 KB",
      fileType: "docx",
    },
    {
      id: "3",
      name: "Informe Mensual",
      author: "Ana López",
      createdDate: "2024-09-28",
      updatedDate: "2024-11-18",
      version: "3.0",
      size: "320 KB",
      fileType: "docx",
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDelete = (template: Template) => {
    setSelectedTemplate(template);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log("Deleting template:", selectedTemplate);
    setDeleteModalVisible(false);
    setSelectedTemplate(null);
  };

  const handleAction = (key: string, template: Template) => {
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

  const getActionMenuItems = (template: Template): MenuProps["items"] => [
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
        <Space className="text-red-600">
          <DeleteOutlined />
          {t("templates.actions.delete")}
        </Space>
      ),
      onClick: () => handleDelete(template),
    },
  ];

  const columns: ColumnsType<Template> = [
    {
      title: t("templates.table.name"),
      dataIndex: "name",
      key: "name",
      render: (name: string, record: Template) => (
        <Space>
          <div>
            <div className="font-medium text-gray-900">{name}</div>
            <div className="text-sm text-gray-500">{record.size}</div>
          </div>
        </Space>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      title: t("templates.table.author"),
      dataIndex: "author",
      key: "author",
      sorter: (a, b) => a.author.localeCompare(b.author),
    },
    {
      title: t("templates.table.version"),
      dataIndex: "version",
      key: "version",
      render: (version: string) => <Tag color="blue">v{version}</Tag>,
      sorter: (a, b) => a.version.localeCompare(b.version),
    },
    {
      title: t("templates.table.createdDate"),
      dataIndex: "createdDate",
      key: "createdDate",
      render: (date: string) => formatDate(date),
      sorter: (a, b) =>
        new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
    },
    {
      title: t("templates.table.updatedDate"),
      dataIndex: "updatedDate",
      key: "updatedDate",
      render: (date: string) => formatDate(date),
      sorter: (a, b) =>
        new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime(),
      defaultSortOrder: "descend",
    },
    {
      title: t("templates.table.actions"),
      key: "actions",
      width: 120,
      render: (_, record: Template) => (
        <Dropdown
          menu={{ items: getActionMenuItems(record) }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const tableProps: TableProps<Template> = {
    columns,
    dataSource: mockTemplates,
    rowKey: "id",
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
              <div className="text-gray-500 mb-2">
                {t("templates.noTemplates")}
              </div>
              <Text type="secondary" className="text-sm">
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
        <Title level={2} className="mb-2">
          {t("templates.title")}
        </Title>
        <Text type="secondary" className="text-lg">
          {t("templates.description")}
        </Text>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total de Plantillas"
              value={mockTemplates.length}
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
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <Text strong>{selectedTemplate.name}</Text>
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
        <div className="py-4">
          <Dragger {...uploadProps} className="mb-4">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {t("templates.upload.dragText")}{" "}
              <span className="text-blue-600">
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
