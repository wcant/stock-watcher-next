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
    staleTime: 1000 * 60 * 10,
  });

  const priceURL = API_URL + `/stocks/snapshot/${ticker}`;
  const priceQuery = useQuery({
    queryKey: ["price"],
    queryFn: () => axios.get(priceURL).then((res) => res.data),
    staleTime: 1000 * 60,
  });

  const detailsURL = API_URL + `/reference/tickerdetails/${ticker}`;
  const detailsQuery = useQuery({
    queryKey: ["details"],
    queryFn: () => axios.get(detailsURL).then((res) => res.data),
    staleTime: 1000 * 60 * 600,
  });

  return (
    <main className="w-7/8 w-max-5xl mx-auto">
      <div className="p-4">
        <TickerInput />
      </div>

      <div className="grid grid-cols-6 gap-4 rounded-lg divide-y divide-solid">
        <div className="col-span-4">
          <div className="bg-white px-6 py-4">
            <h2>{detailsQuery.data?.results.name}</h2>
          </div>
          <StockChart ticker={ticker} />
          <div className="grid grid-cols-1">
            {newsQuery.isFetched && <TickerNewsList data={newsQuery?.data} />}
          </div>
        </div>
        <div className="col-span-2">
          {priceQuery.isFetched && (
            <TickerPriceHistory data={priceQuery?.data?.ticker} />
          )}
          {detailsQuery.isFetched && (
            <TickerDetails data={detailsQuery?.data?.results} />
          )}
        </div>
      </div>
    </main>
  );
}
