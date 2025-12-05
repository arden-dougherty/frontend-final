import React, { StrictMode, useEffect, useState } from "react";
import { ReactDOM, createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

if (import.meta.env.DEV) {
  import("@axe-core/react").then(({ default: axe }) => {
    axe(React, ReactDOM, 1000);
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
