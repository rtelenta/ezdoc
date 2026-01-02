import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./config/i18n";
import { AuthProvider } from "./features/session/context/AuthProvider.tsx";
import { RouterProvider } from "./router/RouterProvider.tsx";
import { ConfigProvider, theme } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false,
    },
    mutations: {
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider />
        </AuthProvider>
      </QueryClientProvider>
    </ConfigProvider>
  </StrictMode>
);
