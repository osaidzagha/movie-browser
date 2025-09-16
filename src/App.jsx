import { Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import ShowPage from "./pages/ShowPage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<ShowPage />} />
      </Routes>

      <Toaster position="top-right" />
    </>
  );
}
