import { toast } from "react-hot-toast";
import { API_URL } from "utils/constants";
import axios from "axios";
import GainersLosersTable from "components/GainersLosersTable";
import MarketHolidays from "components/MarketHolidays";
import TickerInput from "components/TickerInput";
import { useQuery } from "@tanstack/react-query";
import TickerNewsList from "components/TickerNewsList";
import SmallNewsCard from "components/SmallNewsCard";
import Heading from "components/Heading";

export default function Home() {
  const allNewsURL = API_URL + `/reference/tickernews/null/15`;
  const newsQuery = useQuery({
    queryKey: ["home", "news", "all-tickers"],
    queryFn: () => axios.get(allNewsURL).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div>
      <div className="mx-auto my-4 max-w-5xl shadow-lg">
        <TickerInput />
      </div>
      <div className="grid grid-cols-5 bg-white divide-x divide-solid p-4 rounded-xl">
        <div className="col-span-3">
          <section>
            <h2>You might be interested in</h2>
          </section>
          <section>
            <Heading hLevel="h2" content="Today's Financial News" />
            {newsQuery.isFetched && (
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
        <div className="col-span-2">
          <section>
            <h2>Your Watchlists</h2>
          </section>
          <section>
            <MarketHolidays />
          </section>
        </div>
      </div>
    </div>
  );
}
