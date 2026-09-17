import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./index.css";

import Nav from "./layout/nav/Nav";
import Navside from "./layout/Navside/Navside";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

import PageHome from "./page/home/PageHome";
import PagesVisualize from "./page/visualize/PagesVisualize";
import PagesForm from "./page/Post/PagesForm";
import PageCreate from "./page/auth/create/PageCreate";
import PageLogin from "./page/auth/login/PageLogin";

import ProtectedRoute from "./components/ProtectedRoute";

export const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen">
        <Nav />

        <SidebarProvider>
          <Navside />

          <SidebarInset>
            <SidebarTrigger />

            <main className="content">
              <Outlet />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </>
  );
};
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <PageHome />,
      },
      {
        path: ":user/:id",
        element: <PagesVisualize />,
      },
      {
        path: "/create-chart",
        element: (
          <ProtectedRoute>
            <PagesForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/auth/login",
        element: <PageLogin />,
      },
      {
        path: "/auth/create",
        element: <PageCreate />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
