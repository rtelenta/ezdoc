import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { TemplatesPage } from "@/features/templates/pages/TemplatesPage";
import { DocumentsPage } from "@/features/documents/pages/DocumentsPage";
import { Layout } from "@/features/session/components/Layout";
import { NotFound } from "./components/NotFound";
import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
  Outlet,
} from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "templates",
        element: <TemplatesPage />,
      },
      {
        path: "documents",
        element: <DocumentsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}
