import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import PageCreate from "./page/auth/create/PageCreate";
import PageLogin from "./page/auth/login/PageLogin";
import PagesForm from "./page/Post/PagesForm";
import PagesVisualize from "./page/visualize/PagesVisualize";
import Nav from "./layout/Nav";
import ProtectedRoute from "./components/ProtectedRoute";
import PageHome from "./page/home/PageHome";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/login"
          element={
            <>
              <Nav isAuth />
              <PageLogin />
            </>
          }
        />

        <Route
          path="/auth/create"
          element={
            <>
              <Nav isAuth />
              <PageCreate />
            </>
          }
        />

        <Route
          path="/create-chart"
          element={
            <ProtectedRoute>
              <Nav />
              <PagesForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <>
              <Nav />
              <PageHome />
            </>
          }
        />

        <Route
          path="/usuario/id post ruta provisional"
          element={
            <>
              <Nav />
              <PagesVisualize />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
