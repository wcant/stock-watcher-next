import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ChartGrid from "pages/ChartGrid";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/chart-grid" element={<ChartGrid />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
