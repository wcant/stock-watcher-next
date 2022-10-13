import { useEffect, useState } from "react";
import GainersLosersTable from "components/GainersLosersTable";
import TickerInput from "components/TickerInput";
import CardContainer from "components/CardContainer";
import MarketsSummaryTabs from "components/MarketsSummaryTabs";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleXmark,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import MarketHolidays from "components/MarketHolidays";

library.add(faCircleXmark, faArrowUp, faArrowDown);

function App() {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://stock-watcher-wcant.herokuapp.com/api"
      : "http://localhost:4000/api";

  const [tickers, setTickers] = useState([]);

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

  return (
    <div className="flex flex-col justify-center p-4">
      <div className="grid grid-cols-3 items-center pb-4">
        <h1 className="text-2xl font-bold text-slate-50">Stock Watcher</h1>
        <TickerInput setTickers={setTickers} apiUrl={API_URL} />
      </div>
      <MarketsSummaryTabs apiUrl={API_URL} />
      <div className="flex flex-row gap-4">
        <GainersLosersTable apiUrl={API_URL} />
        <div className="max-h-min">
          <MarketHolidays apiUrl={API_URL} />
        </div>
      </div>
      <CardContainer
        tickers={tickers}
        setTickers={setTickers}
        apiUrl={API_URL}
      />
    </div>
  );
}

export default App;
