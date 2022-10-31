import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import { collectDataToArrays } from "../utils.js";
import useFetch from "hooks/useFetch";
import { API_URL } from "utils/constants";
import { DELAY_1_MINUTE } from "utils/constants";

function parseAggregatePolygon(data) {
  // Polygon API Aggregate data
  // data = {
  //   "ticker": "NAME",
  //   "queryCount": num,
  //   "resultsCount": num,
  //   "adjusted": true,
  //   "results": [{v, vw, a, o, c, h, l, t, n}, {}, ...]
  //
  // }

  // results.v - volume over time period
  // results.vw - volume weighted average price
  // results.t - unix msec timestamp for the start of the agg window
  // results.o - open price
  // results.n - number of transactions
  // results.l - low price
  // results.h - high
  // results.c - close

  const trace = {
    x: [],
    close: [],
    high: [],
    low: [],
    open: [],
  };

  data.forEach((period) => {
    trace.x.push(period.t);
    trace.close.push(period.c);
    trace.high.push(period.h);
    trace.low.push(period.l);
    trace.open.push(period.o);
  });

  return trace;
}

export default function StockChart(props) {
  const { ticker } = props;

  const url =
    API_URL + `/aggs/ticker/${ticker}/range/1/minute/2022-10-23/2022-10-24/300`;

  const { data, isLoading, error, refetch } = useFetch(url);

  if (error) console.log(error);

  // const [lastRefresh, setLastRefresh] = useState(null);
  const [trace, setTrace] = useState({
    increasing: { line: { color: "green" } },
    decreasing: { line: { color: "red" } },
    type: "candlestick",
    xaxis: "x",
    yaxis: "y",
  });

  const [layout, setLayout] = useState({
    dragmode: "zoom",
    showlegend: false,
    xaxis: {
      rangeslider: {
        visible: false,
      },
    },
  });

  useEffect(() => {
    if (data.hasOwnProperty("results")) {
      setTrace((prevTrace) => {
        const parsedData = parseAggregatePolygon(data.results);
        return {
          ...prevTrace,
          ...parsedData,
        };
      });
    }
  }, [data]);

  // useEffect(() => {
  //   if (intradayData) {
  //     setTrace((prevTrace) => {
  //       const result = collectDataToArrays(
  //         "09:30:00",
  //         "16:00:00",
  //         5,
  //         intradayData
  //       );
  //       return {
  //         ...prevTrace,
  //         ...result,
  //       };
  //     });
  //   } else {
  //     console.log(`WARNING: intradayData contains ${intradayData}`);
  //   }
  // }, [intradayData]);

  // const getData = async () => {
  //   try {
  //     const response = await axios.get(dataUrl + `/intraday/${symbol}`);
  //     setIntradayData(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  //   console.log(intradayData);
  //   const interval = setInterval(() => {
  //     getData();
  //   }, 300000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, DELAY_1_MINUTE);

    return () => clearInterval(interval);
  }, []);

  return (
    <Plot
      data={[trace]}
      layout={layout}
      useResizeHandler={true}
      // className="w-full h-full"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
