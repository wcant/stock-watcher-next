import { useEffect } from "react";
import useFetch from "hooks/useFetch";
import { API_URL } from "utils/constants";
import StockChart from "components/StockChart";

export default function ChartContainer(props) {
  const { ticker } = props;

  return (
    <div>
      <StockChart />
    </div>
  );
}
