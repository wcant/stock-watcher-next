import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "utils/constants";
import TickerInput from "components/TickerInput";
import StockChart from "components/StockChart";
import TickerNewsList from "components/TickerNewsList";
import TickerDetails from "pages/Quote/components/TickerDetails";
import TickerPriceHistory from "pages/Quote/components/TickerPriceHistory";
import Heading from "components/Heading";
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
    <div className="w-full">
      <div className="p-4">
        <TickerInput />
      </div>
      <div className="rounded-lg mb-4">
        <div className="bg-white px-6 py-4">
          <Heading hLevel="h1" content={detailsQuery.data?.results.name} />
        </div>
        <StockChart ticker={ticker} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 rounded-lg">
        <div className="flex flex-col items-center gap-4 md:h-full md:flex-row">
          <div className="h-full w-full  md:basis-1/3">
            {priceQuery.isFetched && (
              <TickerPriceHistory data={priceQuery?.data?.ticker} />
            )}
          </div>
          <div className="h-full  md:basis-2/3">
            {detailsQuery.isFetched && (
              <TickerDetails data={detailsQuery?.data?.results} />
            )}
          </div>
        </div>
        <div className="">
          {newsQuery.isFetched && <TickerNewsList data={newsQuery?.data} />}
        </div>
      </div>
    </div>
  );
}
