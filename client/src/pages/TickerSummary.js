import { useParams } from "react-router-dom";

export default function TickerSummary() {
  const params = useParams();
  return (
    <main className="flex justify-center">
      <div className="max-w-5xl">
        <h1>Ticker Summary Page for {params.ticker}</h1>
      </div>
    </main>
  );
}
