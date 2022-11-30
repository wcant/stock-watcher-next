import { useState } from "react";
import { NavLink, Link, useNavigate, Routes, Route } from "react-router-dom";
import ChartGrid from "pages/ChartGrid";
import Chart from "pages/Chart";
import Quote from "pages/Quote";
import TickerInput from "components/TickerInput";
import MarketsSummaryTabs from "components/MarketsSummaryTabs";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleXmark,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(faCircleXmark, faArrowUp, faArrowDown);

function App() {
  const [gridTickers, setGridTickers] = useState([]);
  const [quoteTicker, setQuoteTicker] = useState("");

  const updateGridTickers = (ticker) => {
    setGridTickers((prevGrid) => {
      return [...prevGrid, ticker];
    });
  };

  const updateQuoteTickers = (ticker) => {
    setQuoteTicker(ticker);
  };

  const activeClasses = "underline";
  return (
    <>
      <div className="flex flex-col justify-center p-4">
        <div className="grid grid-cols-3 items-center pb-4">
          <div className="flex items-center p-4">
            <h1 className="mr-6 text-2xl font-bold text-slate-50">
              Stock Watcher
            </h1>
            <nav className="w-full flex-grow lg:flex lg:items-center lg:w-auto text-slate-50">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? activeClasses : undefined
                }
              >
                <span className="mr-6 hover:text-blue-400">Grid</span>
              </NavLink>
              <NavLink
                to="/chart"
                className={({ isActive }) =>
                  isActive ? activeClasses : undefined
                }
              >
                <span className="mr-6">ChartView</span>
              </NavLink>
              <NavLink
                to="/quote"
                className={({ isActive }) =>
                  isActive ? activeClasses : undefined
                }
              >
                <span className="mr-6">Quote</span>
              </NavLink>
            </nav>
          </div>
          {/* <Routes>
            <Route
              path="/"
              element={
                <TickerInput data={gridTickers} setData={updateGridTickers} />
              }
            />
            <Route
              path="/*"
              element={
                <TickerInput data={quoteTicker} setData={updateQuoteTickers} />
              }
            />
          </Routes>
          <TickerInput /> */}
        </div>
        <div className="flex justify-center w-full">
          <MarketsSummaryTabs />
        </div>
      </div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ChartGrid
              gridTickers={gridTickers}
              setGridTickers={setGridTickers}
            />
          }
        />
        <Route
          path="/chart/:ticker"
          element={
            <Chart quoteTicker={quoteTicker} setQuoteTicker={setQuoteTicker} />
          }
        />
        <Route
          path="/quote/:ticker"
          element={
            <Quote quoteTicker={quoteTicker} setQuoteTicker={setQuoteTicker} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
