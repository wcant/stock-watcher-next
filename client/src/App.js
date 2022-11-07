import { Link, useNavigate, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import ChartGrid from "pages/ChartGrid";
import TickerOverview from "pages/TickerOverview";
import TickerInput from "components/TickerInput";
import MarketsSummaryTabs from "components/MarketsSummaryTabs";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleXmark,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import MarketsSummary from "components/MarketsSummaryTabs";

library.add(faCircleXmark, faArrowUp, faArrowDown);

function App() {
  const navigate = useNavigate();

  // Handle input submit on Home and TickerSummary Pages
  const handleSubmit = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="flex flex-col justify-center p-4">
        <div className="grid grid-cols-3 items-center pb-4">
          <nav className="text-slate-50">
            <Link to="/">
              <h1 className="text-2xl font-bold text-slate-50">
                Stock Watcher
              </h1>
            </Link>
            <Link to="/chart-grid">Chart Grid</Link>
          </nav>
          <TickerInput handleSubmit={handleSubmit} />
        </div>
      </div>
      <MarketsSummaryTabs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart-grid" element={<ChartGrid />} />
        <Route path="/overview/:ticker" element={<TickerOverview />} />
      </Routes>
    </>
  );
}

export default App;

// useEffect(() => {
//   try {
//     fetch(url, {
//       json: true,
//       headers: { "User-Agent": "request" },
//     })
//       .then((res) => {
//         if (res.status !== 200) {
//           console.log("Status:", res.status);
//         } else {
//           // data is successfully parsed as a JSON object:
//           return res.json();
//         }
//       })
//       .then((data) => {
//         console.log(data);
//         setData(data);
//       });
//   } catch (error) {
//     console.log("Error:", error);
//   }
// }, []);
