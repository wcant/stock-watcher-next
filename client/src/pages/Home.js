import GainersLosersTable from "components/GainersLosersTable";
import MarketsSummaryTabs from "components/MarketsSummaryTabs";
import MarketHolidays from "components/MarketHolidays";

export default function Home() {
  return (
    <div>
      <MarketsSummaryTabs />
      <div className="flex flex-row gap-4">
        <GainersLosersTable />
        <div className="max-h-min">
          <MarketHolidays />
        </div>
      </div>
    </div>
  );
}
