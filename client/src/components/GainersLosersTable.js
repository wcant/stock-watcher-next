import TickerTable from "components/TickerTable";
import axios from "axios";
import { DELAY_15_MINUTES, API_URL } from "utils/constants";
import { useQuery } from "@tanstack/react-query";

export default function GainersLosersTable() {
  const headings = ["Ticker", "Last", "Change", "Change %", "Volume"];

  const gainersQuery = useQuery({
    queryKey: ["home", "stocks", "gainers"],
    queryFn: () =>
      axios.get(API_URL + "/stocks/gainers").then((res) => res.data),
    staleTime: DELAY_15_MINUTES,
  });

  const losersQuery = useQuery({
    queryKey: ["home", "stocks", "losers"],
    queryFn: () =>
      axios.get(API_URL + "/stocks/losers").then((res) => res.data),
    staleTime: DELAY_15_MINUTES,
  });

  // maximum of 20 rows, so not going to memo this
  const gainersBodyRows = parseGainersLosers(gainersQuery.data?.tickers);

  const losersBodyRows = parseGainersLosers(losersQuery.data?.tickers);

  return (
    <div
      className="grid grid-cols-2 p-4
    mt-4 mb-4 rounded-lg overflow-auto bg-white text-center"
    >
      <div>
        <h2 className="font-semibold">Top Gainers</h2>
        <TickerTable headings={headings} bodyRows={gainersBodyRows} />
      </div>
      <div className="border-l">
        <h2 className="font-semibold">Top Losers</h2>
        <TickerTable headings={headings} bodyRows={losersBodyRows} />
      </div>
    </div>
  );
}

function parseGainersLosers(data) {
  return data.reduce((rows, result) => {
    const {
      ticker,
      todaysChangePerc,
      todaysChange,
      day: { v: volume },
      min: { c: last },
    } = result;

    const compactVolume = Intl.NumberFormat("en-us", {
      notation: "compact",
    }).format(volume);

    rows.push([
      ticker,
      last.toFixed(2),
      todaysChange.toFixed(2),
      todaysChangePerc.toFixed(2),
      compactVolume,
    ]);
    return rows;
  });
}
