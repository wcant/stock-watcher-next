import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "utils/constants";
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
// endpoints used

// quote / recent trade info
// /api/stocks/snapshot/:symbol

// news
// /api/reference/news/:symbol

export default function Quote() {
  const { ticker } = useParams();

  const queryClient = useQueryClient();

  const url = API_URL + `/reference/tickers/${ticker}/1`;

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["quote"],
  });
  // address = { address1, city, state, postal_code };
  // branding = { logo_url, icon_url };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <main className="flex justify-center">
      {isLoading ? (
        <LoadingModal />
      ) : (
        <>
          <div className="max-w-5xl">
            <h2>{data.hasOwnProperty("name") && data.name}</h2>
          </div>
          <div>
            <StockChart />
          </div>
          <div>
            <TickerNewsList />
            <TickerPriceHistory />
            <TickerDetails />
          </div>
        </>
      )}
    </main>
  );
}
