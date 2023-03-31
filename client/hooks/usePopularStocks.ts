import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/constants";

const placeholderTickers = [
  "AAPL",
  "MSFT",
  "AMZN",
  "META",
  "GM",
  "BAC",
  "GS",
  "GE",
  "TSLA",
  "JPM",
  "MRNA",
  "SQ",
  "BA",
  "F",
  "GOOGL",
  "INTC",
  "AMD",
  "CCL",
  "DAL",
  "WMT",
  "DIS",
  "MCD",
  "NFLX",
  "NVDA",
  "XOM",
  "MU",
  "T",
  "TGT",
  "HD",
  "BBY",
  "PFE",
  "PEP",
  "WM",
];

type PopularStocks = [string[], Boolean, Boolean];

export default function usePopularStocks(): PopularStocks {
  const url = API_URL + "/stocks/popular";
  const stocksQuery = useQuery({
    queryKey: ["popular-tickers"],
    queryFn: async () => {
      const res = await fetch(url);
      return res.json();
    },
    staleTime: 1000 * 60 * 60,
  });
  if (stocksQuery.isSuccess) {
    const top20: string[] = [];
    for (let i = 0; i < 20; i++) {
      top20.push(stocksQuery?.data?.results[i]?.ticker);
    }
    return [top20, stocksQuery.isSuccess, stocksQuery.isLoading];
  }

  if (stocksQuery.isError) {
    return [placeholderTickers, true, false];
  }
  if (stocksQuery.isLoading) {
    console.log(stocksQuery.status);
    return [[], stocksQuery.isSuccess, stocksQuery.isLoading];
  }

  return [[], false, false];
}
