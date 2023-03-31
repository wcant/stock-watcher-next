import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StockChart from "components/StockChart";
import { API_URL } from "utils/constants";

export default function GridCard(props) {
  const { ticker, setTickers } = props;

  const [updateTime, setUpdateTime] = useState("");

  // useEffect(() => {
  //   const quoteEl = document.querySelector("#quote");
  //   quoteEl.classList.add("animate-ping");
  //   setTimeout(() => quoteEl.classList.remove("animate-ping", 4000));
  // }, []);

  function handleDeleteCard() {
    console.log("clicked delete");
    setTickers((prevTickers) => {
      return prevTickers.filter((prevTicker) => prevTicker !== ticker);
    });
  }

  return (
    <div className="flex flex-col justify-center  bg-white p-6 relative rounded-xl">
      <span className="close-card-icon-bg" onClick={handleDeleteCard}>
        <FontAwesomeIcon className="close-card-icon" icon="circle-xmark" />
      </span>
      <div className="stock--header">
        <h2 className="text-3xl font-bold">{ticker}</h2>
        <span className="text-xs rounded-full bg-slate-100 px-2 py-1 font-light">
          Last Update: {Date().slice(0, 24)}
          {/* {data.hasOwnProperty("from") ? `${data.from}` : "-"} */}
        </span>
        {/* <span id="quote" className="transition-all">
          {quoteData.hasOwnProperty("Global Quote") && quotePrice}
        </span>
        <span>{quoteData.hasOwnProperty("Global Quote") && quotePercent}</span>
        <span>{quoteData.hasOwnProperty("Global Quote") && quoteChange}</span> */}
      </div>
      <div className="min-h-900">
        <StockChart ticker={ticker} API_URL={API_URL} />
      </div>

      {/* </div> */}
    </div>
  );
}
