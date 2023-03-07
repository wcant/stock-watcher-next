import { useState, useEffect, useReducer, useRef } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import { DateTime } from "luxon";
import { API_URL } from "utils/constants";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import parseAggregateQuery from "utils/parseAggregateQuery";

// the chartQuery response object will successfully return (res 200) on a day
// that the market wasn't open, such as holiday or weekend, so to actually get
// a data.results object successfully you must provide a valid trading day.

// This also means trading ranges that include an invalid trading day will return less
// days than expected.  This is an issue for having the ability to select a range
// in the PlotPeriodSelector component.

// TODO
// if a request gets no results, need to handle showing the last traded day data
// also, dealing with the problem that 1day and 5 day periods don't necessarily show that number of days
// if a weekend or holiday is within the period
// request previous day data for ticker
// determine date from timestamp
// convert date to YYYY-MM-DD
//

export default function StockChart(props) {
  const { ticker, fullHeight } = props;

  const today = DateTime.now().toFormat("yyyy-LL-dd");
  // const [trace, setTrace] = useState({
  //   increasing: { line: { color: "green" } },
  //   decreasing: { line: { color: "red" } },
  //   type: "candlestick",
  //   xaxis: "x",
  //   yaxis: "y",
  // });

  const time = DateTime.fromMillis(1676970000000).toLocaleString(
    DateTime.TIME_SIMPLE
  );

  console.log(time);

  const [plotData, setPlotData] = useState({
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
  });

  const [chartOptions, dispatch] = useReducer(setChartOptions, {
    layout: {
      dragmode: "zoom",
      showlegend: false,
      xaxis: {
        nticks: 10,
        rangeslider: {
          visible: true,
        },
        tickmode: "auto",
        showticklabels: true,
        tickangle: 0,
      },

      autosize: true,
      datarevision: 0,
    },
    config: {},
  });

  function setChartOptions(state, action) {
    switch (action.type) {
      case "trigger_plot_rerender": {
        return {
          ...state,
          layout: {
            ...state.layout,
            datarevision: state.datarevision + 1,
          },
        };
      }
      default:
        break;
    }
    throw Error("unknown action");
  }

  const initialQueryOptions = {
    multiplier: 1,
    timespan: "minute",
    from: today,
    to: today,
  };

  const { multiplier, timespan, from, to } = initialQueryOptions;
  const initialQueryURL =
    API_URL +
    `/aggregates/${ticker}/range/${multiplier}/${timespan}/${from}/${to}`;

  const chartQuery = useQuery({
    queryKey: ["quote", "chart", ticker],
    staleTime: 1000 * 60,
    queryFn: async () => {
      const response = await axios.get(initialQueryURL);
      console.log(response);
      setPlotData((prevPlotData) => {
        return {
          ...prevPlotData,
          ...response.results,
        };
      });
      return response;
    },
  });

  const updateChart = useMutation({
    mutationFn: async (mutatedUrl) => {
      const response = await axios.get(mutatedUrl);
      return response;
    },
    // onSuccess: (data) => {
    //   QueryClient.setQueryData(["quote", "chart", ticker], data)
    // },
  });

  useEffect(() => {
    if (chartQuery.isSuccess) {
      const newTrace = parseAggregateQuery(chartQuery.data.data.results);
      setPlotData((prevPlotData) => ({ ...prevPlotData, ...newTrace }));
      // dispatch({ type: "trigger_plot_rerender" });
    }
  }, [
    chartQuery?.data?.data?.results,
    chartQuery?.isSuccess,
    chartOptions.layout.datarevision,
  ]);

  useEffect(() => {
    // on successful mutation, dispatch({type: "trigger_plot_rerender"})
    if (updateChart.isSuccess) {
      console.log(updateChart.data.data.results);
      const newTrace = parseAggregateQuery(updateChart.data.data.results);
      setPlotData((prevPlotData) => ({ ...prevPlotData, ...newTrace }));
      // dispatch({ type: "trigger_plot_rerender", trace: newTrace });
    }
  }, [
    updateChart.isSuccess,
    updateChart?.data?.data?.results,
    chartOptions.layout.datarevision,
  ]);

  function handlePeriodUpdate({ type, ticker }) {
    const now = DateTime.now();

    switch (type) {
      case "set_period_1day": {
        const from = now.toFormat("yyyy-LL-dd");
        const to = now.toFormat("yyyy-LL-dd");
        const mutatedUrl =
          API_URL +
          `/aggregates/${ticker}/range/${1}/${"minute"}/${from}/${to}`;
        updateChart.mutate(mutatedUrl);
        break;
      }
      case "set_period_5day": {
        const from = now.minus({ days: 5 }).toFormat("yyyy-LL-dd");
        const to = now.toFormat("yyyy-LL-dd");
        const mutatedUrl =
          API_URL +
          `/aggregates/${ticker}/range/${5}/${"minute"}/${from}/${to}`;
        updateChart.mutate(mutatedUrl);
        break;
      }
      // case "set_period_1month": {
      //   return {
      //     ...state,
      //     queryOptions: {
      //       ...state.queryOptions,
      //       multiplier: 1,
      //       timespan: "day",
      //       from: now.minus({ month: 1 }).toFormat("yyyy-LL-dd"),
      //       to: now.toFormat("yyyy-LL-dd"),
      //     },
      //   };
      // }
      // case "set_period_6month": {
      //   return {
      //     ...state,
      //     queryOptions: {
      //       ...state.queryOptions,
      //       multiplier: 1,
      //       timespan: "day",
      //       from: now.minus({ month: 6 }).toFormat("yyyy-LL-dd"),
      //       to: now.toFormat("yyyy-LL-dd"),
      //     },
      //   };
      // }
      // case "set_period_ytd": {
      //   return {
      //     ...state,
      //     queryOptions: {
      //       ...state.queryOptions,
      //       multiplier: 1,
      //       timespan: "day",
      //       from: now.toFormat("kkkk"),
      //       to: now.toFormat("yyyy-LL-dd"),
      //     },
      //   };
      // }
      // case "set_period_1year": {
      //   return {
      //     ...state,
      //     queryOptions: {
      //       ...state.queryOptions,
      //       multiplier: 1,
      //       timespan: "day",
      //       from: now.minus({ year: 1 }).toFormat("yyyy-LL-dd"),
      //       to: now.toFormat("yyyy-LL-dd"),
      //     },
      //   };
      // }
      // case "set_period_5year": {
      //   return {
      //     ...state,
      //     queryOptions: {
      //       ...state.queryOptions,
      //       multiplier: 1,
      //       timespan: "week",
      //       from: now.minus({ year: 5 }).toFormat("yyyy-LL-dd"),
      //       to: now.toFormat("yyyy-LL-dd"),
      //     },
      //   };
      // }
      default:
        break;
    }
  }

  if (chartQuery.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (chartQuery.isError) {
    return <h1>Error loading chart...</h1>;
  }

  let styles = { width: "100%", marginTop: "none" };

  return (
    <div className="p-2 bg-white">
      <PlotPeriodSelector
        handlePeriodUpdate={handlePeriodUpdate}
        ticker={ticker}
      />
      <Plot
        data={[{ ...plotData }]}
        {...chartOptions}
        useResizeHandler={true}
        style={styles}
      />
    </div>
  );
}

const PlotPeriodSelector = ({ handlePeriodUpdate, ticker }) => {
  return (
    <div className="flex bg-white">
      <button
        onClick={() => handlePeriodUpdate({ type: "set_period_1day", ticker })}
      >
        <span className="px-4">1D</span>
      </button>
      <button
        onClick={() => handlePeriodUpdate({ type: "set_period_5day", ticker })}
      >
        <span className="px-4">5D</span>
      </button>
      <button
        onClick={() =>
          handlePeriodUpdate({ type: "set_period_1month", ticker })
        }
      >
        <span className="px-4">1M</span>
      </button>
      <button
        onClick={() =>
          handlePeriodUpdate({ type: "set_period_6month", ticker })
        }
      >
        <span className="px-4">6M</span>
      </button>
      <button
        onClick={() => handlePeriodUpdate({ type: "set_period_ytd", ticker })}
      >
        <span className="px-4">YTD</span>
      </button>
      <button
        onClick={() => handlePeriodUpdate({ type: "set_period_1year", ticker })}
      >
        <span className="px-4">1Y</span>
      </button>
      <button
        onClick={() => handlePeriodUpdate({ type: "set_period_5year", ticker })}
      >
        <span className="px-4">5Y</span>
      </button>
    </div>
  );
};
