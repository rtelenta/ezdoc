import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { NotFound } from "./components/NotFound";
import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}
