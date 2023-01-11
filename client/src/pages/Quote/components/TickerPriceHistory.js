import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "utils/constants";

export default function TickerPriceHistory(props) {
  const { ticker } = props;

  const [data, setData] = useState({});
  const [quoteData, setQuoteData] = useState({});

  async function getQuote() {
    try {
      const response = await axios.get(API_URL + `/quote/${ticker}`);
      setQuoteData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getOpenCloseData() {
      try {
        const response = await axios.get(API_URL + `/day-open-close/${ticker}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getOpenCloseData();
  }, []);

  useEffect(() => {
    getQuote();
    console.log("calling getQuote");
    const interval = setInterval(() => {
      getQuote();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

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

  return (
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
  );
}
