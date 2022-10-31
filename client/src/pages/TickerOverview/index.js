import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "hooks/useFetch";
import { API_URL } from "utils/constants";
import StockChart from "components/StockChart";
import TickerNewsList from "pages/TickerOverview/components//TickerNewsList";
import TickerDetails from "pages/TickerOverview/components/TickerDetails";
import TickerPricing from "pages/TickerOverview/components//TickerPricing";
// endpoints used

// quote / recent trade info
// /api/stocks/snapshot/:symbol

// news
// /api/reference/news/:symbol

export default function TickerOverview() {
  const { ticker } = useParams();

  const url = API_URL + `/reference/tickers/${ticker}/1`;

  const { data, isLoading, error } = useFetch(url);
  // address = { address1, city, state, postal_code };
  // branding = { logo_url, icon_url };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <main className="flex justify-center">
      <div className="max-w-5xl">
        <h2>{data.hasOwnProperty("name") && data.name}</h2>
      </div>
      <div>
        <StockChart />
      </div>
      <div>
        <TickerNewsList />
        <TickerPricing />
        <TickerDetails />
      </div>
    </main>
  );
}
