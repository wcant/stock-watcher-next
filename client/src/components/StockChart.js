import { useState, useEffect, useReducer } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import { DateTime } from "luxon";
import { collectDataToArrays } from "../utils.js";
import { API_URL } from "utils/constants";
import { DELAY_1_MINUTE } from "utils/constants";
import { useQuery, useMutation } from "@tanstack/react-query";

function reducer(state, action) {
  switch (action.type) {
    case "change_multiplier": {
      return {
        ...state,
        multiplier: action.newMultiplier,
      };
    }
    case "change_timespan": {
      return {
        ...state,
        timespan: action.newTimespan,
      };
    }
    case "change_start_date": {
      return {
        ...state,
        from: action.newStartDate,
      };
    }
    case "change_end_date": {
      return {
        ...state,
        from: action.newEndDate,
      };
    }
    case "change_limit": {
      return {
        ...state,
        limit: action.newLimit,
      };
    }
    default:
      break;
  }

  throw Error("unknown action");
}

export default function StockChart(props) {
  const { ticker } = props;

  const today = DateTime.now().toFormat("yyyy-LL-dd");

  const [state, dispatch] = useReducer(reducer, {
    multiplier: 1,
    timespan: "minute",
    from: today,
    to: today,
    limit: 120,
  });

  const chartURL = API_URL + `/aggregates/${ticker}/range/`;
  const chartQuery = useQuery({
    queryKey: ["quote"],
    queryFn: () => axios.get(chartURL).then((res) => res.data),
  });

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

  // useEffect(() => {
  //   if (data.hasOwnProperty("results")) {
  //     setTrace((prevTrace) => {
  //       const parsedData = parseAggregatePolygon(data.results);
  //       return {
  //         ...prevTrace,
  //         ...parsedData,
  //       };
  //     });
  //   }
  // }, [data]);

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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refetch();
  //   }, DELAY_1_MINUTE);

  //   return () => clearInterval(interval);
  // }, []);

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
