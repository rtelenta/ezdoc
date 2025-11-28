import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./config/i18n";
import { AuthProvider } from "./features/session/context/AuthProvider.tsx";
import { RouterProvider } from "./router/RouterProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider />
    </AuthProvider>
  </StrictMode>
);
