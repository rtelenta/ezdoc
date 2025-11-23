import { Spin } from "antd";

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Spin size="large" />
    </div>
  );
}
