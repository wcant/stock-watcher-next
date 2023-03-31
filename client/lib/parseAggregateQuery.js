import { DateTime } from "luxon";

export default function parseAggregateQuery(data) {
  // Polygon API Aggregate data
  // data = {
  //   "ticker": "NAME",
  //   "queryCount": num,
  //   "resultsCount": num,
  //   "adjusted": true,
  //   "results": [{v, vw, a, o, c, h, l, t, n}, {}, ...]
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
    increasing: { line: { color: "green" } },
    decreasing: { line: { color: "red" } },
    type: "candlestick",
    xaxis: "x",
    yaxis: "y",
  };

  try {
    data.forEach((period) => {
      const time = DateTime.fromMillis(period.t).toLocaleString(
        DateTime.TIME_SIMPLE
      );
      trace.x.push(time);
      trace.close.push(period.c);
      trace.high.push(period.h);
      trace.low.push(period.l);
      trace.open.push(period.o);
    });
  } catch (error) {
    console.error("Error parsing aggregate data...", error);
  }

  return trace;
}
