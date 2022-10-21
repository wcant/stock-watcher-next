import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import Home from "pages/Home";
import ChartGrid from "pages/ChartGrid";
import TickerSummary from "pages/TickerSummary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/chart-grid" element={<ChartGrid />} />
          <Route path="/:ticker" element={<TickerSummary />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
