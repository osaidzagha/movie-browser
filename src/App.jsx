import React from "react";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <HomePage />
      <Toaster position="top-right" />
    </>
  );
}
