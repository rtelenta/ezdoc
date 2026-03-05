import { useState } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Table, Button, Input, Card, Empty, Typography, Alert } from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useGetDocuments } from "../useCases/useGetDocuments";
import type { DocumentType } from "../types/DocumentType";

const { Title, Text } = Typography;
const { Search } = Input;

export function DocumentsPage() {
  const { t } = useTranslation();
  const { data: documents, isLoading, error } = useGetDocuments();
  const [searchText, setSearchText] = useState("");

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy, HH:mm", { locale: es });
  };

  const columns: ColumnsType<DocumentType> = [
    {
      title: t("documents.table.description"),
      dataIndex: "description",
      key: "description",
      render: (description: string, record: DocumentType) => (
        <div>
          <div className="font-medium text-(--ant-color-text)">
            {description}
          </div>
          <div className="text-(length:--ant-font-size-sm) text-(--ant-color-text-secondary)">
            {record.id}
          </div>
        </div>
      ),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) =>
        record.description
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        record.id.toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      title: t("documents.table.createdDate"),
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => formatDate(date),
      sorter: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      defaultSortOrder: "descend",
    },
    {
      title: t("documents.table.actions"),
      key: "actions",
      width: 120,
      render: (_, record: DocumentType) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          href={record.view_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("documents.actions.view")}
        </Button>
      ),
    },
  ];

  const tableProps: TableProps<DocumentType> = {
    columns,
    dataSource: documents || [],
    rowKey: "id",
    loading: isLoading,
    pagination: {
      pageSize: 10,
      showTotal: (total, range) =>
        `${range[0]}-${range[1]} de ${total} documentos`,
    },
    locale: {
      emptyText: (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div>
              <div className="text-(--ant-color-text-secondary) mb-(--ant-margin-xs)">
                {t("documents.noDocuments")}
              </div>
              <Text
                type="secondary"
                className="text-(length:--ant-font-size-sm)"
              >
                {t("documents.noDocumentsDescription")}
              </Text>
            </div>
          }
        />
      ),
    },
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Title level={2} className="mb-(--ant-margin-xs)">
          {t("documents.title")}
        </Title>
        <Text type="secondary" className="text-(length:--ant-font-size-lg)">
          {t("documents.description")}
        </Text>
      </div>

      {error && (
        <Alert
          message={t("documents.error")}
          description={error.message}
          type="error"
          showIcon
          closable
        />
      )}

      <Card>
        <Search
          placeholder={t("documents.searchPlaceholder")}
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          className="w-full sm:w-80"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Card>

      <Card>
        <Table {...tableProps} />
      </Card>
    </div>
  );
}
