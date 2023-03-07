import { useState, useContext } from "react";
import GainersLosersTable from "components/GainersLosersTable";
import MarketsSummaryTabs from "components/MarketsSummaryTabs";
import MarketHolidays from "components/MarketHolidays";
import TickerInput from "components/TickerInput";
import NewsCard from "components/NewsCard";
export default function Home() {
  return (
    <div>
      <TickerInput />

      <div className="grid grid-cols-2">
        <div>
          <h2>You might be interested in</h2>
        </div>
        <div>
          <h2>Today's Financial News</h2>
        </div>
        <div>
          <div>
            <h2>Your Lists</h2>
          </div>
          <div>
            <GainersLosersTable />
          </div>
          <div>
            <MarketHolidays />
          </div>
        </div>
      </div>
    </div>
  );
}
