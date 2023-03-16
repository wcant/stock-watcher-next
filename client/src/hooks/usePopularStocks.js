import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "utils/constants";

export default function usePopularStocks() {
  const url = API_URL + "/stocks/popular";
  const stocksQuery = useQuery({
    queryKey: ["popular-tickers"],
    queryFn: () => axios.get(url).then((res) => res.data),
    staleTime: 1000 * 60 * 60,
  });
  if (stocksQuery.isSuccess) {
    const top20 = [];
    for (let i = 0; i < 20; i++) {
      top20.push(stocksQuery?.data?.results[i]?.ticker);
    }
    return [top20, stocksQuery.isSuccess];
  }

  if (stocksQuery.isError) {
    return [
      [
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
      ],
      true,
    ];
  }
  if (stocksQuery.isLoading) {
    console.log(stocksQuery.status);
    return [[], stocksQuery.isSuccess, stocksQuery.isLoading];
  }
}
