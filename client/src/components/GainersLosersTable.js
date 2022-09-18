import { useState, useEffect } from "react";
import TickerTable from "./TickerTable";
import axios from "axios";

export default function GainersLosersTable(props) {
  const { apiUrl } = props;

  const headings = ["Ticker", "Last", "Change", "Change %", "Volume"];
  const keysToExtract = [
    "ticker",
    ["min", "c"],
    "todaysChange",
    "todaysChangePerc",
    ["day", "v"],
  ];

  const [gainers, setGainers] = useState({
    data: [],
    bodyRows: [],
    footerRows: [],
  });
  const [losers, setLosers] = useState({
    data: [],
    bodyRows: [],
    footerRows: [],
  });

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(apiUrl + "/stocks/gainers");
        setGainers((prevGainers) => ({
          ...prevGainers,
          data: response.data.tickers,
          bodyRows: extractObjsToArrays(response.data.tickers, keysToExtract),
        }));
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await axios.get(apiUrl + "/stocks/losers");
        setLosers((prevLosers) => ({
          ...prevLosers,
          data: response.data.tickers,
          bodyRows: extractObjsToArrays(response.data.tickers, keysToExtract),
        }));
      } catch (error) {
        console.log(error);
      }
    }

    getData();
    const interval = setInterval(() => {
      getData();
    }, 900000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="grid grid-cols-2 p-4
    mt-6 mb-6 rounded-xl overflow-auto bg-white text-center"
    >
      <div>
        <h2 className="font-semibold">Top Gainers</h2>
        <TickerTable
          headings={headings}
          bodyRows={gainers.bodyRows}
          footerRows={gainers.footerRows}
        />
      </div>
      <div className="border-l">
        <h2 className="font-semibold">Top Losers</h2>
        <TickerTable
          headings={headings}
          bodyRows={losers.bodyRows}
          footerRows={losers.footerRows}
        />
      </div>
    </div>
  );
}

function extractObjsToArrays(arrayOfObjs, keys) {
  return arrayOfObjs.map((obj) => {
    const newArray = [];
    // writing this for this specific case
    // might do this recursively for a general solution
    // for traversing an object of arbitrary depth
    for (const key of keys) {
      if (typeof key === "object" && key !== null) {
        newArray.push(obj[key[0]][key[1]]);
      } else {
        newArray.push(obj[key]);
      }
    }
    return newArray;
  });
}
