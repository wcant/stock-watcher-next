import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StockChart from "components/StockChart";

function Chart() {
  const { ticker } = useParams();

  return <div>index</div>;
}

export default Chart;
