import HomePage from "./home-page";
import { useQuery, useQueries } from "@tanstack/react-query";
import { API_URL } from "@/lib/constants";
import { DELAY_15_MINUTES, placeholderTickers } from "@/lib/constants";
import { restClient } from "@polygon.io/client-js";

const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
const rest = restClient(POLYGON_API_KEY);

async function getPopularStocks() {
  const res = await fetch(
    "https://apewisdom.io/api/v1.0/filter/all-stocks/page/1"
  );
  return res.json();
}

async function getNews() {
  const res = await rest.reference.tickerNews({
    limit: 20,
  });
  console.log(res);
}

export default async function Page() {
  const popularStocksPromise = getPopularStocks();
  const newsPromise = getNews();

  const [popularStocks, news] = await Promise.all([
    popularStocksPromise,
    newsPromise,
  ]);

  type PopularStocks = [string[], Boolean, Boolean];
  function usePopularStocks(): PopularStocks {
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

  const [popularTickers, isPopularSuccess, isPopularLoading] =
    usePopularStocks();

  const popularTickersUrls = popularTickers.map(
    (ticker: string) => API_URL + `/stocks/snapshot/${ticker}`
  );

  const popularTickersQuery = useQueries({
    queries: popularTickersUrls.map((endpoint: string) => {
      return {
        queryKey: ["home", "popular-tickers", endpoint],
        queryFn: async () => {
          const res = await fetch(endpoint);
          return res.json();
        },
        staleTime: DELAY_15_MINUTES,
        enabled: !!popularTickers.length,
      };
    }),
  });

  const allNewsURL = API_URL + `/reference/tickernews/null/15`;
  const newsQuery = useQuery({
    queryKey: ["home", "news", "all-tickers"],
    queryFn: async () => {
      const res = await fetch(allNewsURL);
      return res.json();
    },
    staleTime: DELAY_15_MINUTES,
  });

  return (
    <HomePage popularTickersQuery={popularTickersQuery} newsQuery={newsQuery} />
  );
}
