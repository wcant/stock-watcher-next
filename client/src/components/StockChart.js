import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import { collectDataToArrays } from "../utils.js";

export default function StockChart(props) {
  const { dataUrl, symbol } = props;

  const [intradayData, setIntradayData] = useState(null);

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
    if (intradayData) {
      setTrace((prevTrace) => {
        const result = collectDataToArrays(
          "09:30:00",
          "16:00:00",
          5,
          intradayData
        );
        return {
          ...prevTrace,
          ...result,
        };
      });
    } else {
      console.log(`WARNING: intradayData contains ${intradayData}`);
    }
  }, [intradayData]);

  const getData = async () => {
    try {
      const response = await axios.get(dataUrl + `/intraday/${symbol}`);
      setIntradayData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    console.log(intradayData);
    const interval = setInterval(() => {
      getData();
    }, 300000);

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
