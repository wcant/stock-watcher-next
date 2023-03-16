import { toast } from "react-hot-toast";
import { API_URL } from "utils/constants";
import axios from "axios";
import GainersLosersTable from "components/GainersLosersTable";
import MarketHolidays from "components/MarketHolidays";
import TickerInput from "components/TickerInput";
import { useQuery, useQueries } from "@tanstack/react-query";
import TickerNewsList from "components/TickerNewsList";
import SmallNewsCard from "components/SmallNewsCard";
import Heading from "components/Heading";
import RegularList from "components/RegularList";
import TickerListItem from "components/TickerListItem";
import usePopularStocks from "hooks/usePopularStocks";
import Watchlist from "components/Watchlist";

export default function Home() {
  const [popularTickers, isPopularSuccess, isPopularLoading] =
    usePopularStocks();

  const isLoggedIn = false;

  console.log(popularTickers);
  // is user authed?
  // if yes, check for watchlist
  // if non-empty watchlist exists then show top movers in the list
  // if no watchlist OR user isn't authed exists then show top 6 popular stocks

  const allNewsURL = API_URL + `/reference/tickernews/null/15`;
  const newsQuery = useQuery({
    queryKey: ["home", "news", "all-tickers"],
    queryFn: () => axios.get(allNewsURL).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });

  const popularTickersUrls = popularTickers.map(
    (ticker) => API_URL + `/stocks/snapshot/${ticker}`
  );
  const popularTickersQuery = useQueries({
    queries: popularTickersUrls.map((endpoint) => {
      return {
        queryKey: ["home", "popular-tickers", endpoint],
        queryFn: () => axios.get(endpoint).then((res) => res.data),
        staleTime: 1000 * 60,
        enabled: !!popularTickers.length,
      };
    }),
  });
  console.log(popularTickersQuery);
  return (
    <div>
      <div className="mx-auto my-4 max-w-5xl shadow-lg">
        <TickerInput />
      </div>
      <div className="grid grid-cols-5 bg-white divide-x divide-solid p-4 rounded-xl">
        <div className="col-span-3 pr-4">
          <section>
            <Heading hLevel="h2" content="You might be interested in" />
            {isPopularSuccess && (
              <Watchlist
                data={popularTickersQuery}
                renderWith={TickerListItem}
              />
            )}
            {/* {isPopularSuccess && popularTickers.map((stock) => <p>{stock}</p>)} */}
          </section>
          <section>
            <Heading hLevel="h2" content="Today's Financial News" />
            {newsQuery.isSuccess && (
              <TickerNewsList
                data={newsQuery?.data}
                renderWith={SmallNewsCard}
                divideY={true}
              />
            )}
          </section>
          <section>
            <GainersLosersTable />
          </section>
        </div>
        <div className="col-span-2 pl-4">
          <section>
            <Heading hLevel="h2" content="Your Watchlists" />
          </section>
          <section>
            <MarketHolidays />
          </section>
        </div>
      </div>
    </div>
  );
}
