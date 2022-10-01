import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StockChart from "components/StockChart";

export default function StockCard(props) {
  const { ticker, setTickers, apiUrl } = props;

  const [data, setData] = useState({});
  const [quoteData, setQuoteData] = useState({});
  const [updateTime, setUpdateTime] = useState("");

  async function getQuote() {
    try {
      const response = await axios.get(apiUrl + `/quote/${ticker}`);
      setQuoteData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getOpenCloseData() {
      try {
        const response = await axios.get(apiUrl + `/day-open-close/${ticker}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getOpenCloseData();
  }, []);

  // useEffect(() => {
  //   getQuote();
  //   console.log("calling getQuote");
  //   const interval = setInterval(() => {
  //     getQuote();
  //   }, 300000);
  //   return () => clearInterval(interval);
  // }, []);

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

  // Clean up quote strings
  let quotePrice;
  let quotePercent;
  let quoteChange;

  if (quoteData.hasOwnProperty("Global Quote")) {
    const data = quoteData["Global Quote"];

    quotePrice = `$${parseFloat(data["05. price"]).toFixed(2)}`;
    quoteChange = `$${data["09. change"].slice(
      0,
      data["09. change"].length - 2
    )}`;
    quotePercent = `${parseFloat(data["10. change percent"]).toFixed(2)}%`;
  }

  console.log(data);
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
        <StockChart ticker={ticker} apiUrl={apiUrl} />
      </div>

      <div className="flex flex-col">
        <span className="flex justify-between">
          <span className="stock--details-name">Open:</span>
          <span>{data.hasOwnProperty("open") ? `$${data.open}` : "-"}</span>
        </span>
        <span className="flex justify-between">
          <span className="stock--details-name">Close:</span> <br />
          <span>{data.hasOwnProperty("close") ? `$${data.close}` : "-"}</span>
        </span>
        <span className="flex justify-between">
          <span className="stock--details-name">High:</span> <br />
          <span>{data.hasOwnProperty("high") ? `$${data.high}` : "-"}</span>
        </span>
        <span className="flex justify-between">
          <span className="stock--details-name">Low:</span> <br />
          <span>{data.hasOwnProperty("low") ? `$${data.low}` : "-"}</span>
        </span>
        <span className="flex justify-between">
          <span className="stock--details-name">Volume:</span> <br />
          <span>{data.hasOwnProperty("volume") ? data.volume : "-"}</span>
        </span>
      </div>
      {/* </div> */}
    </div>
  );
}
