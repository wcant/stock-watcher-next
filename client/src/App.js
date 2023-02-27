import ChartGrid from "pages/ChartGrid";
import Home from "pages/Home";
import Chart from "pages/Chart";
import Quote from "pages/Quote";
import TickerInput from "components/TickerInput";
import MarketsSummaryTabs from "components/MarketsSummaryTabs";
import { useState } from "react";
import { NavLink, Link, useNavigate, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Toaster } from "react-hot-toast";
import {
  faCircleXmark,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(faCircleXmark, faArrowUp, faArrowDown);

function App() {
  const activeClasses = "underline";

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col justify-center p-4">
        <div className="grid grid-cols-3 items-center pb-4">
          <div className="flex items-center p-4">
            <h1 className="mr-6 text-2xl font-bold text-slate-50">
              Stock Watcher
            </h1>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <MarketsSummaryTabs />
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/chartgrid" element={<ChartGrid />} />
          {/* <Route path="/chart/:ticker" element={<Chart />} /> */}
          <Route exact path="/quote" element={<Home />} />
          <Route path="/quote/:ticker" element={<Quote />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
