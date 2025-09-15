import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import ShowPage from "./pages/ShowPage";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<ShowPage />} />
        </Routes>
      </AnimatePresence>

      <Toaster position="top-right" />
    </>
  );
}
