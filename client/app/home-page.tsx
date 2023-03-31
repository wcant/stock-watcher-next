"use client";
import Head from "next/head";
import { toast } from "react-hot-toast";
import { API_URL, DELAY_15_MINUTES } from "@/lib/constants";
import { useQuery, useQueries } from "@tanstack/react-query";
import GainersLosersTable from "@/components/GainersLosersTable";
import MarketHolidays from "@/components/MarketHolidays";
import TickerInput from "@/components/TickerInput";
import TickerNewsList from "@/components/TickerNewsList";
import SmallNewsCard from "@/components/SmallNewsCard";
import Heading from "@/components/Heading";
import TickerListItem from "@/components/TickerListItem";
import usePopularStocks from "@/hooks/usePopularStocks";
import Watchlist from "@/components/Watchlist";

export default function Home({ popularTickersQuery, newsQuery }) {
  const isLoggedIn = false;

  return (
    <>
      <Head>
        <title>Stock Watcher</title>
        <meta
          name="description"
          content="Inspired by Google Finance and learning React/Next/JS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <div className="mx-auto my-4 max-w-5xl shadow-lg">
            <TickerInput />
          </div>
          <div className="grid grid-cols-5 bg-white divide-x divide-solid p-4 rounded-xl">
            <div className="col-span-3 pr-4">
              <section>
                <Heading hLevel="h2">You might be interested in</Heading>
                {isPopularSuccess && (
                  <Watchlist
                    isLoggedIn={isLoggedIn}
                    data={popularTickersQuery}
                    renderWith={TickerListItem}
                    renderCount={6}
                  />
                )}
                {/* {isPopularSuccess && popularTickers.map((stock) => <p>{stock}</p>)} */}
              </section>
              <section>
                <Heading hLevel="h2">Today's Financial News</Heading>
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
                <Heading hLevel="h2">Your Watchlists</Heading>
              </section>
              <section>{/* <MarketHolidays /> */}</section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
