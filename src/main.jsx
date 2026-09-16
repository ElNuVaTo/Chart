import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import PageCreate from "./page/auth/create/PageCreate";
import PageLogin from "./page/auth/login/PageLogin";
import PagesForm from "./page/Post/PagesForm";
import PagesVisualize from "./page/visualize/PagesVisualize";
import Nav from "./layout/Nav";
import ProtectedRoute from "./components/ProtectedRoute";
import PageHome from "./page/home/PageHome";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <>
          <Nav />
          <PageHome />
        </>
      ),
    },

    {
      path: ":user/:id",
      element: (
        <>
          <Nav />
          <PagesVisualize />
        </>
      ),
    },

    {
      path: "/create-chart",
      element: (
        <ProtectedRoute>
          <Nav />
          <PagesForm />
        </ProtectedRoute>
      ),
    },

    {
      path: "/auth/login",
      element: (
        <>
          <Nav isAuth />
          <PageLogin />
        </>
      ),
    },
    {
      path: "/auth/create",
      element: (
        <>
          <Nav isAuth />
          <PageCreate />
        </>
      ),
    },
  ],
  {
    basename: "/",
  },
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
