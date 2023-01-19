import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "utils/constants";
import TickerInput from "components/TickerInput";
import StockChart from "components/StockChart";
import TickerNewsList from "pages/Quote/components/TickerNewsList";
import TickerDetails from "pages/Quote/components/TickerDetails";
import TickerPriceHistory from "pages/Quote/components/TickerPriceHistory";
import LoadingModal from "components/LoadingModal";
import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";

export default function Quote() {
  const { ticker } = useParams();

  const newsURL = API_URL + `/reference/tickernews/${ticker}/10`;
  const newsQuery = useQuery({
    queryKey: ["news"],
    queryFn: () => axios.get(newsURL).then((res) => res.data),
  });

  const priceURL = API_URL + `/stocks/snapshot/${ticker}`;
  const priceQuery = useQuery({
    queryKey: ["price"],
    queryFn: () => axios.get(priceURL).then((res) => res.data),
  });

  const detailsURL = API_URL + `/reference/tickerdetails/${ticker}`;
  const detailsQuery = useQuery({
    queryKey: ["details"],
    queryFn: () => axios.get(detailsURL).then((res) => res.data),
  });

  return (
    <main className="mt-6">
      <div className="w-40">
        <TickerInput />
      </div>
      <div>
        <div>
          <h2>{detailsQuery.data?.results["name"]}</h2>
        </div>
        <div className="max-w-5xl">
          <h2>{ticker}</h2>
        </div>
        <div>
          <StockChart ticker={ticker} />
        </div>
        <div>
          {priceQuery.isFetched && (
            <TickerPriceHistory data={priceQuery?.data?.ticker} />
          )}
          {detailsQuery.isFetched && (
            <TickerDetails data={detailsQuery?.data?.results} />
          )}
          <div className="bg-white">
            {newsQuery.isFetching ? <h1>Fetching News</h1> : ""}
          </div>
          {newsQuery.isFetched && <TickerNewsList data={newsQuery?.data} />}
        </div>
      </div>
    </main>
  );
}
