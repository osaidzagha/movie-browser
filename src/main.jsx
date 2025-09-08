import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App.jsx";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/movie/:id", element: <div>Movie Details Page</div> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
