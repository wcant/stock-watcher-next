import { TableRow } from "components/Table";
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

  // return (<TickerTable headings={headings} noData={true} />
  return (
    <div
      className="grid grid-cols-2 p-4
    mt-4 mb-4 rounded-lg overflow-auto bg-white text-center"
    >
      <div>
        <h2 className="font-semibold">Top Gainers</h2>
        {gainersQuery.isSuccess && (
          <TableRow
            headings={headings}
            bodyRows={parseGainersLosers(gainersQuery.data?.tickers)}
          />
        )}
      </div>
      <div className="border-l">
        <h2 className="font-semibold">Top Losers</h2>
        {losersQuery.isSuccess && (
          <TableRow
            headings={headings}
            bodyRows={parseGainersLosers(losersQuery.data?.tickers)}
          />
        )}
      </div>
    </div>
  );
}

function parseGainersLosers(data) {
  try {
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
    }, []);
  } catch (error) {
    console.error(error);
  }
}
