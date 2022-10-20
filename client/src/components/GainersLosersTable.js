// Issues:
// - Tickers with zero volume and high % changes tend to populate the results of this query
//    would be nice to be able to filter by market cap and maybe just don't include results
//    with zero volume (or other weird data)

import { useState, useEffect } from "react";
import TickerTable from "components/TickerTable";
import axios from "axios";
import { DELAY_1_MINUTE, DELAY_15_MINUTES, API_URL } from "utils/constants";

export default function GainersLosersTable(props) {
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
        const response = await axios.get(API_URL + "/stocks/gainers");
        setGainers((prevGainers) => ({
          ...prevGainers,
          data: response.data.tickers,
          bodyRows: extractObjsToArrays(response.data.tickers, keysToExtract),
        }));
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await axios.get(API_URL + "/stocks/losers");
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
    }, DELAY_15_MINUTES);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="grid grid-cols-2 p-4
    mt-4 mb-4 rounded-lg overflow-auto bg-white text-center"
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
        // check if is number and set toFixed(2)
        const value = obj[key[0]][key[1]];
        if (typeof value === "number") {
          newArray.push(value.toFixed(2));
        } else newArray.push(obj[key[0]][key[1]]);
      } else {
        const value = obj[key];
        if (typeof value === "number") {
          newArray.push(value.toFixed(2));
        } else {
          newArray.push(value);
        }
      }
    }
    return newArray;
  });
}
