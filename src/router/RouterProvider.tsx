import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
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
