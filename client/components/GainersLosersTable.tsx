import Heading from "./Heading";
import { Table, TableHead, TableBody, TableRow } from "components/Table";
import axios from "axios";
import { DELAY_15_MINUTES, API_URL } from "utils/constants";
import { useQuery } from "@tanstack/react-query";

type GainersLosersResponse = {
  tickers: [];
  status: string;
  request_id: string;
};

// type TickerSnapshot = {
//   ticker: string;
//   todaysChangePerc: number;
//   todaysChange: number;
//   updated: number;
//   day: {};
//   min: {};
//   prevDay: {};
// };

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

  const gainersRows = parseGainersLosers(gainersQuery.data?.tickers);
  const losersRows = parseGainersLosers(losersQuery.data?.tickers);

  return (
    <div
      className="grid grid-cols-2 p-4
mt-4 mb-4 rounded-lg overflow-auto bg-white text-center"
    >
      <div>
        <Heading hLevel="h3">Top Gainers</Heading>
        <Table>
          <TableHead>
            <TableRow type="head" cols={headings} />
          </TableHead>
          <TableBody>
            {gainersQuery.isSuccess &&
              gainersRows?.map((cols, i) => (
                <TableRow key={i} type="body" cols={cols} />
              ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <Heading hLevel="h3">Top Losers</Heading>
        <Table>
          <TableHead>
            <TableRow type="head" cols={headings} />
          </TableHead>
          <TableBody>
            {losersQuery.isSuccess &&
              losersRows?.map((cols, i) => (
                <TableRow key={i} type="body" cols={cols} />
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function parseGainersLosers(data: TickerSnapshot[]) {
  try {
    return data.reduce(
      (rows: (string | number)[][], result: TickerSnapshot) => {
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
      },
      []
    );
  } catch (error) {
    console.error(error);
  }
}
